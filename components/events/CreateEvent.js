import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PrimaryButton } from '../buttons/PrimaryButton.tsx';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Title } from '../typography/Title.tsx';
import { toast } from 'react-toastify';

const CreateEventForm = () => {
	const { data: session } = useSession();
	const { getAllEvents } = useContext(EventContext);
	const { currentEvent } = useContext(WorkspaceContext);
	const [nameValue, setNameValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');

	const handleName = (event) => {
		setNameValue(event.target.value);
	};
	const handleDescription = (event) => {
		setDescriptionValue(event.target.value);
	};
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			if (nameValue === '' || descriptionValue === '') {
				throw new Error();
			}
			const res = await axios.post(`/api/events`, {
				name: nameValue,
				description: descriptionValue,
				creator: session.user.id,
				collaborators: [
					{
						_id: session.user.id,
						name: session.user.name,
						email: session.user.email,
						image: session.user.image,
					},
				],
			});

			setNameValue('');
			setDescriptionValue('');
			getAllEvents();

			toast.success('Successfully created your event ✨', {
				toastId: 'created-event-toast',
			});
		} catch (error) {
			if (nameValue === '' || descriptionValue === '') {
				toast.error('Please enter a name and description. ✍🏾', {
					toastId: 'unauthenticated-route-toast',
				});
			} else {
				toast.error('Something went wrong, sorry! 😵‍💫', {
					toastId: 'error-creating-event-toast',
				});
			}
		}
	};

	return (
		<StyledForm
			onSubmit={handleSubmit}
			initial={{ scale: 0.95, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ ease: 'easeIn', duration: '0.25', type: 'spring' }}>
			<Title variant='heading3'>Create a new event 🚀</Title>
			<label htmlFor='name'></label>
			<StyledInput
				type='text'
				name='name'
				id='name'
				placeholder='Choose a name'
				value={nameValue}
				onChange={handleName}
			/>
			<label htmlFor='description'></label>
			<StyledInput
				type='text'
				name='description'
				id='description'
				placeholder='Add a description'
				value={descriptionValue}
				onChange={handleDescription}
			/>
			<StyledSubmitButton
				variant='fullSmall'
				type='submit'
				content='Create event'
			/>
		</StyledForm>
	);
};

export default CreateEventForm;

const StyledForm = styled(motion.form)(
	({ theme: { colors } }) => `
	padding: 16px;
	box-sizing: border-box;
	width: calc(50% - 16px);
	border-radius: 10px;
	margin: 16px 0 8px 0;
	background: ${colors.bgLight};

	@media only screen and (max-width: 768px) {
		width: 100%;
		margin: 8px 0;
	}
`
);
const StyledInput = styled.input`
	box-sizing: border-box;
	border-radius: 5px;
	padding: 8px;
	width: 100%;
	outline: none;
	border: none;
	margin: 8px 0 16px 0;
	font-family: inherit;
	height: 40px;
`;
const StyledSubmitButton = styled(PrimaryButton)`
	margin: 8px 0;
`;
