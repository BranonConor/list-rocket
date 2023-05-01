import styled from 'styled-components';
import { ToggleSwitch } from '../inputs/ToggleSwitch';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const EventControls = () => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);

	const [toggleIsChecked, setToggleIsChecked] = useState(
		currentEvent.anonymousModeIsOn
	);

	const handleToggleChange = async () => {
		setToggleIsChecked(!toggleIsChecked);
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

			//TODO - implement live update with websockets
		} catch (error) {
			console.log(error);
			toast.error(`Something went wrong 😵‍💫`, {
				toastId: 'anonymous-mode-off-toast',
			});
		}
	};

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
					handleChange={handleToggleChange}
					checked={toggleIsChecked}
				/>
			</StyledRow>
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
