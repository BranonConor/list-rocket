import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from '../buttons/Button';

const EventCard = (props) => {
	const handleDelete = async (e) => {
		e.preventDefault();
		const res = await axios({
			method: 'delete', //DELETE REQUEST
			url: `${process.env.SERVER_DOMAIN}/api/events/${props.id}`,
		});
		setCurrentEvent({});
		getAllEvents();
	};

	const handleEnter = async (e) => {
		e.preventDefault();
		await prepWorkspace(props.id);
		router.push('/workspace');
	};

	return (
		<StyledCard
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{ ease: 'easeIn', duration: '0.25', type: 'spring' }}>
			<h3>{props.name}</h3>
			<p>{props.description}</p>

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
	width: 350px;
	border-radius: 10px;
	box-sizing: border-box;
	text-align: left;
	margin: 16px 16px 16px 0;
	padding: 16px;
	background: ${colors.bgLight};
	box-shadow: ${shadows.standard};

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

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		background: ${colors.bgRedLight};
	}
`
);
