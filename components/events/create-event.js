import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from '../buttons/Button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

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
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<StyledForm
			onSubmit={handleSubmit}
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{ ease: 'easeIn', duration: '0.25', type: 'spring' }}>
			<h2>Create a new event 🚀</h2>
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
			<Button type='submit' content='Create event' width='100%' />
		</StyledForm>
	);
};

export default CreateEventForm;

const StyledForm = styled(motion.form)(
	({ theme: { colors, shadows } }) => `
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
	margin: 8px 0;
`;
