import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../../contexts/types';

interface DeleteEventParams {
	eventId: string;
	user: IUser;
}

const deleteEvent = async ({ eventId, user }: DeleteEventParams) => {
	const { data } = await axios.delete(`/api/events/${eventId}`, {
		data: {
			eventId: eventId,
			user: user,
		},
	});

	return data;
};

export const useDeleteEventMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(deleteEvent, {
		onSuccess: () => {
			queryClient.invalidateQueries(['events']);
		},
	});
};
