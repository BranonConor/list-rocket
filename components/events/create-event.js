import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from '../buttons/Button';

const CreateEventForm = () => {
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
			<Button type='submit' content='Create event' />
		</StyledForm>
	);
};

export default CreateEventForm;

const StyledForm = styled(motion.form)(
	({ theme: { colors, shadows } }) => `
	padding: 16px;
	box-sizing: border-box;
	width: 350px;
	border-radius: 10px;
	margin: 16px 0;
	background: ${colors.bgLight};
	box-shadow: ${shadows.standard};
`
);
const StyledInput = styled.input`
	font-family: 'Baloo Tamma 2';
	box-sizing: border-box;
	border-radius: 5px;
	padding: 8px;
	width: 100%;
	outline: none;
	border: none;
	margin: 8px 0;

	&::placeholder {
		font-family: 'Baloo Tamma 2';
	}
`;
