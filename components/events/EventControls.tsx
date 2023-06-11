import styled from 'styled-components';
import { ToggleSwitch } from '../inputs/ToggleSwitch';
import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import Pusher from 'pusher-js';
import { Dialog } from '../Dialog';
import { IEvent, IUser } from '../../contexts/types';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';

export const EventControls = () => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);

	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [accordionIsOpen, setAccordionIsOpen] = useState(true);
	const [listHeightValue, setListHeightValue] = useState(
		currentEvent?.controls?.listHeight
	);

	useEffect(() => {
		setListHeightValue(currentEvent?.controls?.listHeight);
	}, [prepWorkspace]);

	const handleChange = () => {
		setDialogIsOpen(true);
	};

	const handleAccordionClick = () => {
		setAccordionIsOpen(!accordionIsOpen);
	};

	const handleListHeightChange = async (e) => {
		setListHeightValue(e.target.value);

		try {
			await axios.put(`/api/events/${currentEvent._id}`, {
				eventId: currentEvent._id,
				action: 'list-height-change',
				listHeight: e.target.value,
			});

			prepWorkspace(currentEvent._id);

			// Reversing this logic creates the correct UI, since this toast call
			// doesn't yet know of the new currentEvent state
			toast.info(`List heights set to: ${e.target.value}`, {
				toastId: `anonymous-mode-on-toast-${e.target.value}`,
			});

			// ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent?._id,
				user: user,
				action: 'event-update',
				subAction: 'list-height-change',
			});
		} catch (error) {
			console.log(error);
			toast.error(`Something went wrong 😵‍💫`, {
				toastId: 'anonymous-mode-off-toast',
			});
		}
	};

	const handleToggleChange = async (currentEvent: IEvent, user: IUser) => {
		try {
			await axios.put(`/api/events/${currentEvent._id}`, {
				eventId: currentEvent._id,
				action: 'anonymous-mode-toggle',
			});

			prepWorkspace(currentEvent._id);

			//Reversing this logic creates the correct UI, since this toast call
			//doesn't yet know of the new currentEvent state
			if (!currentEvent?.controls?.anonymousModeIsOn) {
				toast.info(`Event is now in anonymous mode 🦸🏽‍♀️`, {
					toastId: 'anonymous-mode-on-toast',
				});
			} else {
				toast.info(`Event is no longer in anonymous mode 👀`, {
					toastId: 'anonymous-mode-off-toast',
				});
			}

			setDialogIsOpen(false);
			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent?._id,
				user: user,
				action: 'event-update',
				subAction: 'anonymous-mode-toggle',
				anonymousModeIsOn: currentEvent?.controls?.anonymousModeIsOn,
			});
		} catch (error) {
			console.log(error);
			toast.error(`Something went wrong 😵‍💫`, {
				toastId: 'anonymous-mode-off-toast',
			});
		}
	};

	//Pusher Event Subscription to keep toggle in sync with event state
	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
		});
		//subscribe to the event channel
		const channel = pusher.subscribe(`event-channel-${currentEvent?._id}`);
		//bind a function to the event-channel-update trigger, update UI
		channel.bind(`event-channel-update-${currentEvent?._id}`, (data) => {
			//refresh the workspace if a change occured in the event you're working on
			if (currentEvent?._id === data.eventId) {
				prepWorkspace(currentEvent?._id);

				//for everyone but the user that made the change, notify
				if (
					data.user._id !== user._id &&
					data.subAction === 'anonymous-mode-toggle'
				) {
					if (!data.anonymousModeIsOn) {
						toast.info(
							`A collaborator put the event in anonymous mode 🦸🏽‍♀️`,
							{
								toastId:
									'anonymous-mode-on-from-other-client-toast',
							}
						);
					} else {
						toast.info(
							`A collaborator turned off anonymous mode 👀`,
							{
								toastId:
									'anonymous-mode-off-from-other-client-toast',
							}
						);
					}
				}

				//list height change
				if (
					data.user._id !== user._id &&
					data.subAction === 'list-height-change'
				) {
					toast.info(`A collaborator updated the list heights`, {
						toastId: 'list-height-change-from-other-client-toast',
					});
				}
			}
		});
		//unsubscribe to the event channel on cleanup
		return () => {
			pusher.disconnect();
		};
	}, []);

	return (
		<StyledEventControls
			accordionIsOpen={accordionIsOpen}
			initial={{
				top: -20,
				opacity: 0,
			}}
			animate={{
				top: 0,
				opacity: 1,
			}}
			transition={{
				duration: 0.1,
				type: 'spring',
				delay: 0.05,
			}}>
			<StyledTitleRow
				onClick={handleAccordionClick}
				accordionIsOpen={accordionIsOpen}>
				<StyledTitle variant='heading3'>Event Controls</StyledTitle>
				<img src='/icons/chevron.svg' alt='' />
			</StyledTitleRow>
			<StyledRow>
				<StyledLabel variant='overline'>
					<StyledIcon src='/icons/eye-dark.svg' alt='' />
					Anonymous Mode:
				</StyledLabel>
				<ToggleSwitch
					handleChange={handleChange}
					checked={currentEvent?.controls?.anonymousModeIsOn}
				/>
			</StyledRow>
			<StyledRow>
				<StyledLabel variant='overline'>
					<StyledIcon src='/icons/up-and-down.svg' alt='' />
					List Height:
				</StyledLabel>
				<StyledSelect
					onChange={handleListHeightChange}
					value={listHeightValue}>
					<option value='No limit'>No Limit</option>
					<option value='Small'>Small</option>
					<option value='Medium'>Medium</option>
					<option value='Large'>Large</option>
				</StyledSelect>
			</StyledRow>
			{dialogIsOpen && (
				<Dialog
					title='Anonymous mode'
					description='Are you sure you want to toggle Anonymous Mode for this event? When "ON", collaborators will not be able to see the status of their own items.'
					cta={() => handleToggleChange(currentEvent, user)}
					buttonText='Confirm'
					setDialogIsOpen={setDialogIsOpen}
					showCancelButton
				/>
			)}
		</StyledEventControls>
	);
};

interface IStyledEventControlsProps {
	accordionIsOpen: boolean;
}
const StyledEventControls = styled(motion.div)<IStyledEventControlsProps>(
	({ accordionIsOpen, theme: { colors } }) => `
    position: relative;
	padding: 16px;
    border-radius: 10px;
	box-sizing: border-box;
    background: ${colors.bgLight};
	height: ${accordionIsOpen ? '204px' : '70px'};
	max-height: 100%;
	width: 100%;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	transition: 0.1s ease all;

	@media only screen and (max-width: 950px) {
		height: ${accordionIsOpen ? '70px' : '172px'};
	}
`
);

const StyledLabel = styled(Text)`
	width: 100%;
	margin: 0 16px 0 0;
	display: flex;
	align-items: center;

	img {
		margin: 0 8px 0 0;
	}
`;
const StyledTitleRow = styled.button<IStyledEventControlsProps>(
	({ accordionIsOpen, theme: { colors } }) => `
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 0 16px 0;
	width: 100%;
	outline: none;
	border: none;
	cursor: pointer;
	transition: 0.2s ease all;
	color: ${colors.font.body};
	background: transparent;

	img {
		transform: ${accordionIsOpen ? 'rotate(180deg)' : 'rotate(0)'};
		transition: 0.2s ease all;
	}

	@media only screen and (max-width: 950px) {
		img {
			transform: ${accordionIsOpen ? 'rotate(0deg)' : 'rotate(180deg)'};
		}
	}
`
);
const StyledRow = styled.div`
	display: flex;
	align-items: center;
	margin: 8px 0;
	width: 100%;
`;
const StyledSelect = styled.select(
	({ theme: { colors, typography } }) => `
	width: auto;
	font-family: ${typography.font.body1};
	font-size: ${typography.size.caption};
	color: ${colors.font.body};
	border-radius: 100px;
	padding: 2px 4px;
	border: 2px solid ${colors.bgDark};
	background: ${colors.chip.defaultBg};
	cursor: pointer;

	&:hover {
		background: ${colors.chip.bgLight};
	}
`
);
const StyledIcon = styled.img`
	width: 20px;
	height: 20px;
`;
const StyledTitle = styled(Title)(
	({ theme: { colors } }) => `
	margin: 0;
	color: ${colors.font.body};
`
);
