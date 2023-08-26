import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PrimaryButton } from '../buttons/PrimaryButton';
import axios from 'axios';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Text } from '../typography/Text';
import { toast } from 'react-toastify';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { UserContext } from '../../contexts/UserContext';

export const AddCollaborator = (props) => {
	const { currentEvent } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);
	const [emailValue, setEmailValue] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const handleEmail = (event) => {
		setEmailValue(event.target.value);
	};
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			if (emailValue === '') {
				throw new Error();
			}
			await axios.put(`/api/events`, {
				eventId: currentEvent._id,
				email: emailValue.toLowerCase(),
				action: 'invite',
			});
			await axios.put(`/api/user`, {
				eventId: currentEvent._id,
				email: emailValue.toLowerCase(),
				action: 'invite',
			});

			setEmailValue('');

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
				user: user,
				action: 'event-update',
			});
			await axios.post('/api/pusher', {
				userEmail: emailValue.toLowerCase(),
				action: 'send-invite',
			});

			toast.success(
				`Invited ${emailValue.toLowerCase()} to the event! 👍🏽`,
				{
					toastId: 'added-collaborator-toast',
				}
			);
			props.setIsAddCollaboratorButtonClicked(false);
		} catch (axiosError) {
			if (emailValue === '') {
				toast.error(`Please enter a value. 👀`, {
					toastId: 'collaborator-not-found-toast',
				});
			} else {
				const error = axiosError.response.data.error;
				if (error.message === 'user already exists') {
					toast.error(`${emailValue} is already here! 🤝`, {
						toastId: 'collaborator-already-here-toast',
					});
				} else if (error.message === 'user not found') {
					toast.error(`${emailValue} doesn't have an account. 👀`, {
						toastId: 'collaborator-not-found-toast',
					});
				} else if (error.message === 'user invite is pending') {
					toast.error(`${emailValue} is pending ⏳`, {
						toastId: 'unknown-error-toast',
					});
				} else {
					toast.error(`Unknown error occured. 😵‍💫`, {
						toastId: 'unknown-error-toast',
					});
				}
			}
		}
	};

	return (
		<StyledFormWrapper>
			<StyledForm
				onSubmit={handleSubmit}
				initial={{ left: -16, opacity: 0 }}
				animate={{ left: 0, opacity: 1 }}
				transition={{
					duration: 0.5,
					type: 'spring',
				}}>
				<label htmlFor='email'></label>
				<StyledInput
					initial={{ left: -8, opacity: 0 }}
					animate={{ left: 0, opacity: 1 }}
					transition={{
						duration: 0.25,
						type: 'spring',
					}}
					type='text'
					name='email'
					id='email'
					placeholder='Add a user email'
					value={emailValue}
					onChange={handleEmail}
				/>
				<StyledButtonWrapper>
					<StyledButtonMotionWrapper
						initial={{ left: -12, opacity: 0 }}
						animate={{ left: 0, opacity: 1 }}
						transition={{
							duration: 0.35,
							type: 'spring',
						}}>
						<StyledSubmitButton
							variant='small'
							type='submit'
							content='Submit'
						/>
					</StyledButtonMotionWrapper>
					<StyledButtonMotionWrapper
						initial={{ left: -16, opacity: 0 }}
						animate={{ left: 0, opacity: 1 }}
						transition={{
							duration: 0.45,
							type: 'spring',
						}}>
						<StyledCancelButton
							content='Cancel'
							variant='small'
							type='button'
							onClick={(e) => {
								e?.preventDefault();
								setEmailValue('');
								props.setIsAddCollaboratorButtonClicked(false);
							}}
						/>
					</StyledButtonMotionWrapper>
				</StyledButtonWrapper>
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
	width: 500px;
`;

const StyledForm = styled(motion.form)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 16px;
	box-sizing: border-box;
	border-radius: 10px;

	@media only screen and (max-width: 865px) {
		margin-left: 0;
		margin-top: 8px;
	}

	@media only screen and (max-width: 555px) {
		flex-direction: column;
		height: auto;
		max-height: 100%;
		margin: 8px 0 0 0;
	}

	@media only screen and (max-width: 768px) {
		margin: 0 8px 0 0;
	}
`;
const StyledInput = styled(motion.input)(
	({ theme: { typography, shadows } }) => `
	width: 100%;
	max-width: 100%;
	box-sizing: border-box;
	border-radius: 5px;
	padding: 8px;
	height: 40px;
	outline: none;
	border: none;
	font-family: Poppins;
	font-size: ${typography.size.body2};
	padding: 4px 8px;
	box-shadow: ${shadows.standard};
	position: relative;

	@media only screen and (max-width: 555px) {
		width: 100%;
	}
`
);
const StyledErrorText = styled(Text)`
	color: red;
`;
const StyledButtonWrapper = styled.div`
	width: 50%;
	display: flex;

	@media only screen and (max-width: 555px) {
		width: 100%;
		margin: 8px 0 0 0;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
`;
const StyledSubmitButton = styled(PrimaryButton)`
	margin: 0 8px 0 16px;
	position: relative;

	@media only screen and (max-width: 555px) {
		margin: 8px 8px 0 0;
	}
`;
const StyledCancelButton = styled(SecondaryButton)`
	margin: 0 8px 0 8px;
	position: relative;

	@media only screen and (max-width: 555px) {
		margin: 8px 0 0 0;
	}
`;
const StyledButtonMotionWrapper = styled(motion.div)`
	position: relative;
`;
