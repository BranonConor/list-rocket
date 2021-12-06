import { useContext, useState } from 'react';

import { EventContext } from '../../contexts/EventContext';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from '../buttons/Button';

const CreateEventForm = () => {
	const { user } = useContext(UserContext);
	const { getAllEvents } = useContext(EventContext);
	const [nameValue, setNameValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');

	const handleName = (event) => {
		setNameValue(event.target.value);
	};
	const handleDescription = (event) => {
		setDescriptionValue(event.target.value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const createEvent = await axios({
			method: 'post',
			url: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/events/new`,
			data: {
				name: nameValue,
				description: descriptionValue,
				creator: user._id,
			},
		});
		setNameValue('');
		setDescriptionValue('');
		getAllEvents();
	};

	return (
		<StyledForm
			action='/api/events/new'
			method='POST'
			className={styles.CreateEventForm}
			onSubmit={handleSubmit}
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{ ease: 'easeIn', duration: '0.25', type: 'spring' }}>
			<label htmlFor='name'>Create a new event 🚀</label>
			<StyledInput
				type='text'
				name='name'
				id='name'
				placeholder='Choose a name'
				value={nameValue}
				onChange={handleName}
				className={styles.input}
			/>
			<label htmlFor='description'></label>
			<StyledInput
				type='text'
				name='description'
				id='description'
				placeholder='Add a description'
				value={descriptionValue}
				onChange={handleDescription}
				className={styles.input}
			/>
			<Button type='submit'>Create event</Button>
		</StyledForm>
	);
};

export default CreateEventForm;

const StyledForm = styled(motion.form)`
	padding: 16px;
	box-sizing: border-box;
	width: 350px;
	border-radius: 10px;
	margin: 16px 0;
`;
const StyledInput = styled.input`
	box-sizing: border-box;
	border-radius: 5px;
	padding: 8px;
	width: 100%;
	outline: none;
	color: white;
	margin: 8px 0;

	&::placeholder {
		color: blue;
	}
`;
