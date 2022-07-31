import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PrimaryButton } from '../buttons/PrimaryButton.tsx';
import { useContext } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { useRouter } from 'next/router';
import { Title } from '../typography/Title.tsx';
import { Text } from '../typography/Text.tsx';
import { toast } from 'react-toastify';

const EventCard = (props) => {
	const { name, description, id, creator, animationFactor } = props;
	const { getAllEvents } = useContext(EventContext);
	const { prepWorkspace, currentEvent, clearWorkspace } =
		useContext(WorkspaceContext);
	const router = useRouter();

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.delete(`/api/events/${id}`);
			getAllEvents();
			currentEvent?._id === id && clearWorkspace();
			toast.success('Successfully deleted your event 🗑', {
				toastId: 'delete-event-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'error-delete-event-toast',
			});
		}
	};

	const handleClick = async (e) => {
		e.preventDefault();
		prepWorkspace(id, creator);
		router.push('/workspace');
	};

	return (
		<StyledCard
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{
				ease: 'easeIn',
				duration: `${0.125 * (animationFactor + 0.5)}`,
				type: 'spring',
			}}>
			<Title variant='heading3'>{name}</Title>
			<StyledP variant='body1'>{description}</StyledP>

			<StyledButtonContainer>
				<PrimaryButton
					onClick={handleClick}
					content='Enter event'
					variant='large'
				/>
				<StyledDeleteButton onClick={handleDelete}>
					<img src='/icons/trash-light.svg' alt='Trash Icon' />
				</StyledDeleteButton>
			</StyledButtonContainer>
		</StyledCard>
	);
};

export default EventCard;

const StyledCard = styled(motion.div)(
	({ theme: { colors } }) => `
	width: calc(25% - 16px);
	border-radius: 10px;
	box-sizing: border-box;
	text-align: left;
	padding: 16px;
	background: ${colors.bgLight};
	
	&:hover {
		transform: translateY(2px);
	}

	@media only screen and (max-width: 1150px) {
		width: calc(50% - 8px);
		margin: 8px 0;
		padding: 8px 16px;
	}

	@media only screen and (max-width: 768px) {
		width: 100%;
		margin: 8px 0;
		padding: 8px 16px;
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
	background: ${colors.button.bgRed};
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
		background: ${colors.button.bgRedLight};
	}
`
);

const StyledP = styled(Text)`
	@media only screen and (max-width: 768px) {
		display: none;
	}
`;
