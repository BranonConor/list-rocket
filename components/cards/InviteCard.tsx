import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { useContext } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { useRouter } from 'next/router';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import { SecondaryButton } from '../buttons/SecondaryButton';

export const InviteCard = (props) => {
	const { name, description, id, creator, animationFactor } = props;
	const { getAllEvents } = useContext(EventContext);
	const { user } = useContext(UserContext);
	const { prepWorkspace, currentEvent, clearWorkspace } =
		useContext(WorkspaceContext);
	const router = useRouter();

	const handleDelete = async (e) => {
		e?.preventDefault();
		try {
			const res = await axios.delete(`/api/events/${id}`, {
				data: {
					eventId: id,
					user: user,
				},
			});
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
		e?.preventDefault();
		prepWorkspace(id);
		router.push('/workspace');
	};

	return (
		<StyledCard
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{
				duration: 0.125 * (animationFactor + 0.5),
				type: 'spring',
			}}>
			<div>
				<Title variant='heading4'>{name}</Title>
				<Text variant='body1'>{description}</Text>
				<Text variant='body1'>Creator: {creator.name}</Text>
			</div>

			<StyledButtonContainer>
				<PrimaryButton
					onClick={handleClick}
					content='Join event'
					variant='small'
				/>
				<SecondaryButton
					onClick={handleDelete}
					content='Decline'
					variant='small'
				/>
			</StyledButtonContainer>
		</StyledCard>
	);
};

const StyledCard = styled(motion.div)(
	({ theme: { colors } }) => `
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 10px;
	box-sizing: border-box;
	text-align: left;
	padding: 16px;
	background: ${colors.bgLight};
	
	&:hover {
		transform: translateY(2px);
	}
`
);

const StyledButtonContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	button:first-of-type {
		margin-right: 8px;
	}
`;