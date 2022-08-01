import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PrimaryButton } from '../buttons/PrimaryButton.tsx';
import axios from 'axios';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Text } from '../typography/Text.tsx';
import { toast } from 'react-toastify';

export const AddCollaborator = (props) => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const [emailValue, setEmailValue] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const handleEmail = (event) => {
		setEmailValue(event.target.value);
	};
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const res = await axios.put(`/api/events`, {
				eventId: currentEvent._id,
				email: emailValue,
			});

			setEmailValue('');
			prepWorkspace(currentEvent._id, currentEvent.creator);
			toast.success(`Invited ${emailValue} to the event! 👍🏽`, {
				toastId: 'added-collaborator-toast',
			});
			props.setIsAddCollaboratorButtonClicked(false);
		} catch (axiosError) {
			const error = axiosError.response.data.error;
			if (error.message === 'user already exists') {
				toast.error(`${emailValue} is already here! 🤝`, {
					toastId: 'collaborator-already-here-toast',
				});
			} else if (error.message === 'user not found') {
				toast.error(`${emailValue} doesn't have an account. 👀`, {
					toastId: 'collaborator-not-found-toast',
				});
			} else {
				toast.error(`Unknown error occured. 😵‍💫`, {
					toastId: 'unknown-error-toast',
				});
			}
		}
	};

	return (
		<StyledFormWrapper>
			<StyledForm
				onSubmit={handleSubmit}
				initial={{ top: -200, opacity: 0 }}
				animate={{ top: 0, opacity: 1 }}
				transition={{
					ease: 'easeIn',
					duration: 0.25,
					type: 'spring',
				}}>
				<label htmlFor='email'></label>
				<StyledInput
					type='text'
					name='email'
					id='email'
					placeholder='Add a user email'
					value={emailValue}
					onChange={handleEmail}
				/>
				<PrimaryButton variant='small' type='submit' content='Submit' />
				<StyledAddCollaboratorButton
					type='button'
					onClick={(e) => {
						e.preventDefault();
						setEmailValue('');
						props.setIsAddCollaboratorButtonClicked(false);
					}}>
					<img src='/icons/x.svg' alt='Add Collaborator' />
				</StyledAddCollaboratorButton>
			</StyledForm>
			{errorMessage && (
				<StyledErrorText variant='caption'>
					{errorMessage}
				</StyledErrorText>
			)}
		</StyledFormWrapper>
	);
};

const StyledFormWrapper = styled.div`
	display: block;
`;

const StyledForm = styled(motion.form)(
	({ theme: { colors } }) => `
	width: 50%;
	height: auto;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 8px;
	box-sizing: border-box;
	height: calc(40px + 32px);
	border-radius: 10px;
	margin: 16px 0;
	background: ${colors.bgLight};

	@media only screen and (max-width: 535px) {
		width: 100%;
		height: auto;
		flex-direction: column;
		align-items: center;

		button {
			width: 100%;
			margin: 16px 0 0 0;
		}
	}
`
);
const StyledInput = styled.input`
	width: 50%;
	box-sizing: border-box;
	border-radius: 5px;
	padding: 8px;
	margin: 0 16px 0 0;
	height: 40px;
	outline: none;
	border: none;

	@media only screen and (max-width: 535px) {
		width: 100%;
		margin: 0;
	}
`;
const StyledErrorText = styled(Text)`
	color: red;
`;
const StyledAddCollaboratorButton = styled.button`
	padding: 8px;
	margin: 0;
	height: 40px;
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background: none;
	transition: 0.15s ease all;

	&:hover {
		cursor: pointer;
		transform: scale(1.15);
	}
`;
