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

export const EventControls = () => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);

	const [dialogIsOpen, setDialogIsOpen] = useState(false);

	const handleChange = () => {
		setDialogIsOpen(true);
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
			if (!currentEvent.anonymousModeIsOn) {
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
				event: currentEvent,
				user: user,
				action: 'event-update',
				subAction: 'anonymous-mode-toggle',
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
			if (currentEvent?._id === data.event?._id) {
				prepWorkspace(currentEvent?._id);

				//for everyone but the user that made the change, notify
				if (
					data.user._id !== user._id &&
					data.subAction === 'anonymous-mode-toggle'
				) {
					if (!data.event.anonymousModeIsOn) {
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
			}
		});
		//unsubscribe to the event channel on cleanup
		return () => {
			pusher.disconnect();
		};
	}, []);

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
				duration: 0.25,
				type: 'spring',
				delay: 0.05,
			}}>
			<StyledRow>
				<StyledAnonymousLabel>
					<img src='/icons/hidden.svg' alt='' />
					Anonymous Mode:
				</StyledAnonymousLabel>
				<ToggleSwitch
					handleChange={handleChange}
					checked={currentEvent.anonymousModeIsOn}
				/>
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

const StyledEventControls = styled(motion.div)(
	({ theme: { colors } }) => `
    position: relative;
	padding: 16px;
    border-radius: 10px;
	box-sizing: border-box;
    background: ${colors.bgLight};
	height: 100%;
	width: 100%;
	max-width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
`
);

const StyledAnonymousLabel = styled.span`
	width: 100%;
	margin-right: 16px;
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
