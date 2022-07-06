import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from '../buttons/Button';
import axios from 'axios';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

const AddCollaboratorForm = () => {
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
			setErrorMessage(null);
			prepWorkspace(currentEvent._id, currentEvent.creator);
		} catch (axiosError) {
			const error = axiosError.response.data.error;
			if (error.message === 'user already exists') {
				setErrorMessage('That user is already in the event!');
			} else if (error.message === 'user not found') {
				setErrorMessage('User not found...');
			} else {
				setErrorMessage('Unknown error occurred');
			}
		}
	};

	return (
		<StyledFormWrapper>
			<StyledForm
				onSubmit={handleSubmit}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					ease: 'easeIn',
					duration: '0.25',
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
				<Button
					type='submit'
					content='Add Collaborator'
					width='200px'
				/>
			</StyledForm>
			{errorMessage && <StyledErrorText>{errorMessage}</StyledErrorText>}
		</StyledFormWrapper>
	);
};

export default AddCollaboratorForm;

const StyledFormWrapper = styled.div``;
const StyledForm = styled(motion.form)(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	padding: 16px;
	box-sizing: border-box;
	width: 100%;
	height: calc(40px + 32px);
	border-radius: 10px;
	margin: 16px 0;
	background: ${colors.bgLight};

	@media only screen and (max-width: 535px) {
		flex-direction: column;
		height: auto;

		button {
			width: 100%;
			margin: 16px 0 0 0;
		}
	}
`
);
const StyledInput = styled.input`
	box-sizing: border-box;
	border-radius: 5px;
	padding: 8px;
	margin: 0 16px 0 0;
	width: calc(100% - 200px);
	height: 40px;
	outline: none;
	border: none;

	@media only screen and (max-width: 535px) {
		width: 100%;
		margin: 0;
	}
`;
const StyledErrorText = styled.span`
	color: red;
`;
