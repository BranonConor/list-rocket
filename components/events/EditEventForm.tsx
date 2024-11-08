import { Dispatch, SetStateAction, useContext, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { PrimaryButton } from '../buttons/PrimaryButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { motion } from 'framer-motion';
import { UserContext } from '../../contexts/UserContext';
import { useEditEventMutation } from '../../hooks/mutations/useEditEventMutation';

interface IProps {
	eventId: string;
	name: string;
	description: string;
	setEventIsBeingEdited: Dispatch<SetStateAction<boolean>>;
}

export const EditEventForm: React.FC<IProps> = (props) => {
	const { eventId, name, description, setEventIsBeingEdited } = props;
	const { currentEvent } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);
	const { mutate: editEvent } = useEditEventMutation();

	const [nameValue, setNameValue] = useState(name);
	const [descriptionValue, setDescriptionValue] = useState(description);

	const handleCancelClick = (event: any) => {
		event.preventDefault();
		setEventIsBeingEdited(false);
	};

	const handleSubmit = async (event: any) => {
		//prevent unnecessary API calls
		if (nameValue === name && descriptionValue === description) {
			setEventIsBeingEdited(false);
		} else {
			try {
				event.preventDefault();
				if (name === '' || description === '') {
					throw new Error();
				}

				editEvent({
					name: nameValue,
					description: descriptionValue,
					eventId: eventId,
				});

				setEventIsBeingEdited(false);

				//ping Pusher channel, this will trigger a rerender in the UserList
				await axios.post('/api/pusher', {
					eventId: currentEvent._id,
					user: user,
					action: 'event-update',
				});

				toast.success(`List item updated! 👍🏽`, {
					toastId: 'updated-event-toast',
				});
			} catch (axiosError) {
				if (name === '' || description === '') {
					toast.error(`Please fill out all fields. 👀`, {
						toastId: 'event-value-not-found-toast',
					});
				} else {
					toast.error('Something went wrong, sorry! 😵‍💫', {
						toastId: 'error-updating-event-toast',
					});
				}
			}
		}
	};

	return (
		<StyledWrapper
			initial={{
				scale: 0,
				opacity: 0,
			}}
			animate={{
				scale: 1,
				opacity: 1,
			}}
			transition={{
				duration: 0.15,
				type: 'spring',
			}}>
			<StyledForm onSubmit={handleSubmit}>
				<StyledTextInput
					value={nameValue}
					placeholder={name}
					name='title'
					required
					onChange={(e) => setNameValue(e.target.value)}
				/>
				<StyledTextArea
					value={descriptionValue}
					placeholder={description}
					name='title'
					required
					onChange={(e) => setDescriptionValue(e.target.value)}
					rows={1}
				/>
				<StyledButtonWrapper>
					<PrimaryButton
						variant='small'
						content='Submit'
						type='submit'
					/>
					<SecondaryButton
						variant='small'
						content='Cancel'
						type='button'
						onClick={handleCancelClick}
					/>
				</StyledButtonWrapper>
			</StyledForm>
		</StyledWrapper>
	);
};
const StyledWrapper = styled(motion.div)(
	({ theme: { shadows } }) => `
	width: 100%;
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: 5px;
	padding: 16px 8px;
	box-sizing: border-box;
    box-shadow: ${shadows.standard};
`
);
const StyledForm = styled.form`
	width: 100%;
`;
const StyledTextInput = styled.input(
	({ theme: { colors, typography } }) => `
	width: 100%;
	box-sizing: border-box;
	padding: 4px 8px 0 8px;
	margin: 4px 0;
	border: none;
    font-family: Lalezar;
    font-size: ${typography.size.heading5};
    color: ${colors.font.body};
`
);
const StyledTextArea = styled.textarea(
	({ theme: { colors, typography } }) => `
	width: 100%;
	box-sizing: border-box;
	padding: 8px;
	margin: 4px 0;
	border: none;
	font-family: ${typography.font.body1};
    color: ${colors.font.body};
`
);
const StyledButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	margin: 8px 0 0 0;
	padding: 0 8px;

	button:first-of-type {
		margin-right: 8px;
	}
`;
