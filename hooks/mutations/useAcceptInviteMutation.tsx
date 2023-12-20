import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../../contexts/types';

interface AcceptInviteParams {
	eventId: string;
	user: IUser;
}

const acceptInvite = async ({ eventId, user }: AcceptInviteParams) => {
	const { data: eventData } = await axios.put(`/api/events/${eventId}`, {
		user: user,
		action: 'accept-invite',
	});
	const { data: userData } = await axios.put(`/api/user/${user._id}`, {
		eventId: eventId,
		user: user,
		action: 'accept-invite',
	});
	return { eventData, userData };
};

export const useAcceptInviteMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(acceptInvite, {
		onSuccess: () => {
			queryClient.invalidateQueries(['user']);
		},
	});
};
