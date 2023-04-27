import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { useRouter } from 'next/router';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import { SecondaryButton } from '../buttons/SecondaryButton';

export const InviteCard = (props) => {
	const { name, description, id, creator, animationFactor } = props;
	const { user } = useContext(UserContext);
	const { currentEvent, clearWorkspace, prepWorkspace } =
		useContext(WorkspaceContext);
	const router = useRouter();

	const handleDecline = async () => {
		try {
			const eventRes = await axios.put(`/api/events`, {
				eventId: id,
				user: user,
				action: 'decline',
			});
			const userRes = await axios.put(`/api/user`, {
				eventId: id,
				user: user,
				action: 'decline',
			});

			//ping Pusher channel
			const event = await axios.get(`/api/events/${id}`);
			await axios.post('/api/pusher', {
				event: event.data.data,
				user: user,
				action: 'user-invite',
			});
			await axios.post('/api/pusher', {
				event: event.data.data,
				user: user,
				action: 'event-update',
			});

			currentEvent?._id === id && clearWorkspace();
			toast.info('Invite declined 👋🏽', {
				toastId: 'decline-event-invite-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'error-delete-event-toast',
			});
		}
	};

	const handleAccept = async (e) => {
		try {
			const eventRes = await axios.put(`/api/events`, {
				eventId: id,
				user: user,
				action: 'accept',
			});
			const userRes = await axios.put(`/api/user`, {
				eventId: id,
				user: user,
				action: 'accept',
			});

			//ping Pusher channel
			const event = await axios.get(`/api/events/${id}`);
			await axios.post('/api/pusher', {
				event: event.data.data,
				user: user,
				action: 'user-invite',
			});
			await axios.post('/api/pusher', {
				event: event.data.data,
				user: user,
				action: 'event-update',
			});

			currentEvent?._id === id && clearWorkspace();
			toast.success('Invite accepted 🤘🏽', {
				toastId: 'accept-event-invite-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'accept-event-invite-error-toast',
			});
		}
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
					onClick={handleAccept}
					content='Join event'
					variant='small'
				/>
				<SecondaryButton
					onClick={handleDecline}
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
