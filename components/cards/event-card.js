import { EventContext } from '../../contexts/EventContext';
import TrashIcon from '../icons/trash';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from './event-card.module.scss';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Button from '../buttons/Button';

const EventCard = (props) => {
	const router = useRouter();
	const { getAllEvents } = useContext(EventContext);
	const { prepWorkspace, setCurrentEvent } = useContext(WorkspaceContext);

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
					<TrashIcon />
				</StyledDeleteButton>
			</StyledButtonContainer>
		</StyledCard>
	);
};

export default EventCard;

const StyledCard = styled(motion.div)`
	width: 350px;
	border-radius: 10px;
	box-sizing: border-box;
	text-align: left;
	margin: 16px 16px 16px 0;
`;

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
