import styled from 'styled-components';
import { ToggleSwitch } from '../inputs/ToggleSwitch';
import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { motion } from 'framer-motion';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import Pusher from 'pusher-js';
import { Dialog } from '../Dialog';
import { IEvent, IUser } from '../../contexts/types';
import { Text } from '../typography/Text';
import { EventContext } from '../../contexts/EventContext';

interface IEventControlsProps {
	setIsEventControlsDialogOpen: Dispatch<SetStateAction<boolean>>;
}
export const EventControls: React.FC<IEventControlsProps> = ({
	setIsEventControlsDialogOpen,
}) => {
	const { currentEvent, clearWorkspace, refreshEvent } =
		useContext(WorkspaceContext);
	const { refreshEvents } = useContext(EventContext);
	const { user } = useContext(UserContext);

	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [listHeightValue, setListHeightValue] = useState(
		currentEvent?.controls?.listHeight
	);

	const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
	const [eventToDelete, setEventToDelete] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleChange = () => {
		setDialogIsOpen(true);
	};

	const handleDeleteEventModal = () => {
		setDeleteDialogIsOpen(true);
		setEventToDelete({ id: currentEvent?._id, name: currentEvent?.name });
	};
	//Deleting an event
	const handleDelete = async (
		e: any,
		event: { id: string; name: string }
	) => {
		e?.preventDefault();
		try {
			await axios.delete(`/api/events/${event.id}`, {
				data: {
					eventId: event.id,
					user: user,
				},
			});
			setEventToDelete(null);
			setDeleteDialogIsOpen(false);
			setIsEventControlsDialogOpen(false);
			//wipe the current event
			currentEvent?._id === event.id && clearWorkspace();
			//refresh the user's list of all events
			refreshEvents();
			toast.success('Successfully deleted your event 🗑', {
				toastId: 'delete-event-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'error-delete-event-toast',
			});
		}
	};

	const handleListHeightChange = async (e) => {
		setListHeightValue(e.target.value);

		try {
			await axios.put(`/api/events/${currentEvent._id}`, {
				eventId: currentEvent._id,
				action: 'list-height-change',
				listHeight: e.target.value,
			});

			refreshEvent();

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
				refreshEvent();

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

	//Keep list height values fresh
	useEffect(() => {
		setListHeightValue(currentEvent?.controls?.listHeight);
	}, [refreshEvent]);

	return (
		<StyledEventControls
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
			}}>
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
					<option value='Small'>Small</option>
					<option value='Large'>Large</option>
				</StyledSelect>
			</StyledRow>
			<StyledRow>
				<StyledLabel variant='overline'>
					<StyledIcon src='/icons/trash-dark.svg' />
					Delete Event:
				</StyledLabel>
				<StyledIconButton onClick={handleDeleteEventModal}>
					<img src='/icons/trash-red.svg' alt='Trash' />
				</StyledIconButton>
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
			{deleteDialogIsOpen && (
				<Dialog
					title='Delete Event'
					description={`Are you sure you want to delete ${eventToDelete?.name}?`}
					cta={(e: any) => handleDelete(e, eventToDelete)}
					buttonText='Delete'
					setDialogIsOpen={setDeleteDialogIsOpen}
					showCancelButton
				/>
			)}
		</StyledEventControls>
	);
};

const StyledEventControls = styled(motion.div)(
	({ theme: { colors } }) => `
    position: relative;
	padding: 16px;
    border-radius: 10px;
	box-sizing: border-box;
    background: ${colors.bgLight};
	height: auto;
	max-height: 100%;
	width: 100%;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	transition: 0.1s ease all;
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
const StyledIconButton = styled.button`
	background: none;
	border-radius: 5px;
	box-sizing: border-box;
	outline: none;
	border: none;
	transition: 0.1s ease all;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		transform: scale(1.25);
	}
	img {
		width: 16px;
		height: 16px;
	}
`;
