import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../../contexts/types';

interface declineInviteParams {
	eventId: string;
	user: IUser;
}

const declineInvite = async ({ eventId, user }: declineInviteParams) => {
	const { data: eventData } = await axios.put(`/api/events/${eventId}`, {
		user,
		action: 'decline-invite',
	});
	const { data: userData } = await axios.put(`/api/user/${user._id}`, {
		eventId,
		user,
		action: 'decline-invite',
	});
	return { eventData, userData };
};

export const useDeclineInviteMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(declineInvite, {
		onSuccess: () => {
			queryClient.invalidateQueries(['user']);
		},
	});
};
