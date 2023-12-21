import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface InviteCollaboratorParams {
	eventId: string;
	email: string;
}

const inviteCollaborator = async ({
	eventId,
	email,
}: InviteCollaboratorParams) => {
	const { data: eventData } = await axios.put(`/api/events/${eventId}`, {
		email: email.toLowerCase(),
		action: 'invite',
	});
	const { data: userData } = await axios.put(`/api/user`, {
		eventId,
		email: email.toLowerCase(),
		action: 'invite',
	});
	return { eventData, userData };
};

export const useInviteCollaboratorMutation = () => {
	return useMutation(inviteCollaborator);
};
