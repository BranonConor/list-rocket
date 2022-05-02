import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from '../buttons/Button';
import { useContext } from 'react';
import { EventContext } from '../../contexts/EventContext';

const EventCard = (props) => {
	const { name, description, getEvents, id } = props;
	const { getAllEvents } = useContext(EventContext);

	console.log(`Card ${name}: `, id);

	const handleDelete = async (e) => {
		e.preventDefault();
		const res = await axios.delete(
			`http://localhost:3000/api/events/${id}`
		);
		getAllEvents();
	};

	const handleEnter = async (e) => {
		// e.preventDefault();
		getEvents();
		router.push('/workspace');
	};

	return (
		<StyledCard
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{ ease: 'easeIn', duration: '0.25', type: 'spring' }}>
			<h3>{name}</h3>
			<p>{description}</p>

			<StyledButtonContainer>
				<Button onClick={handleEnter} content='Enter event' />
				<StyledDeleteButton onClick={handleDelete}>
					<img src='/icons/trash-light.svg' alt='Trash Icon' />
				</StyledDeleteButton>
			</StyledButtonContainer>
		</StyledCard>
	);
};

export default EventCard;

const StyledCard = styled(motion.div)(
	({ theme: { colors, shadows } }) => `
	width: calc(25% - 16px);
	min-width: 275px;
	border-radius: 10px;
	box-sizing: border-box;
	text-align: left;
	margin: 16px 16px 16px 0;
	padding: 16px;
	background: ${colors.bgLight};

	&:hover {
		transform: translateY(2px);
	}

	@media only screen and (max-width: 768px) {
		width: 100%;
		margin: 16px 0;
	}
`
);

const StyledButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const StyledDeleteButton = styled.button(
	({ theme: { colors } }) => `
	width: 50px;
	background: ${colors.bgRed};
	border-radius: 5px;
	box-sizing: border-box;
	padding: 8px;
	outline: none;
	border: none;
	transition: 0.10s ease all;
		height: 40px;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		background: ${colors.bgRedLight};
	}
`
);
