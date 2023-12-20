import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { useContext, useState } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { useDeclineInviteMutation } from '../../hooks/mutations/invitations/useDeclineInviteMutation';
import { useAcceptInviteMutation } from '../../hooks/mutations/invitations/useAcceptInviteMutation';

export const InviteCard = (props) => {
	const { name, description, id, creator, animationFactor } = props;
	const { user } = useContext(UserContext);
	const { currentEvent, clearWorkspace } = useContext(WorkspaceContext);
	const { mutate: declineInvite, isLoading: isLoadingDeclineInvite } =
		useDeclineInviteMutation();
	const { mutate: acceptInvite, isLoading: isLoadingAcceptInvite } =
		useAcceptInviteMutation();
	//prevent accidental multiple requests
	const [isAcceptButtonDisabled, setIsAcceptButtonDisabled] = useState(false);

	const handleDecline = async () => {
		try {
			//Decline user invite, update user and event
			declineInvite({ eventId: id, user: user });

			//ping Pusher channel to refresh the event and the collaborator client if they're logged in
			//the current event may be different from the event to update for the invite
			const event = await axios.get(`/api/events/${id}`);
			await axios.post('/api/pusher', {
				user: user,
				action: 'user-invite',
			});
			await axios.post('/api/pusher', {
				eventId: event.data.data._id,
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

	const handleAccept = async () => {
		setIsAcceptButtonDisabled(true);

		try {
			//Accept user invite, update user and event
			acceptInvite({
				eventId: id,
				user: user,
			});

			//ping Pusher channel
			//the current event may be different from the event to update for the invite
			const event = await axios.get(`/api/events/${id}`);
			await axios.post('/api/pusher', {
				user: user,
				action: 'user-invite',
			});
			await axios.post('/api/pusher', {
				eventId: event.data.data._id,
				user: user,
				action: 'event-update',
			});

			currentEvent?._id === id && clearWorkspace();
			toast.success('Invite accepted 🤘🏽', {
				toastId: 'accept-event-invite-toast',
			});
			setIsAcceptButtonDisabled(false);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'accept-event-invite-error-toast',
			});
			setIsAcceptButtonDisabled(false);
		}
	};

	const maxChar = 100;
	const truncatedDescription =
		description.length > maxChar
			? description.slice(0, maxChar).trim().concat('...')
			: description;

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
				<Text variant='body1'>{truncatedDescription}</Text>
				<Text variant='body1'>Creator: {creator.name}</Text>
			</div>

			<StyledButtonContainer>
				<PrimaryButton
					onClick={handleAccept}
					content='Join event'
					variant='small'
					disabled={isAcceptButtonDisabled || isLoadingAcceptInvite}
					isLoading={isAcceptButtonDisabled || isLoadingAcceptInvite}
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
