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
				<Button onClick={handleEnter}>Enter event</Button>
				<StyledDeleteButton onClick={handleDelete}>
					<img src='/icons/trash.svg' alt='Trash Icon' />
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
`
);

const StyledButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const StyledDeleteButton = styled.button`
	width: 50px;
	border: 1px solid rgb(255, 0, 0);
	border-radius: 5px;
	box-sizing: border-box;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
	}
`;
