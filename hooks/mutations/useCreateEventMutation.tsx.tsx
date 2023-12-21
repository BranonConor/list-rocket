import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../../contexts/types';

interface CreateEventParams {
	name: string;
	description: string;
	user: IUser;
}

const createEvent = async ({ name, description, user }: CreateEventParams) => {
	const { data } = await axios.post(`/api/events`, {
		event: {
			name,
			description,
			controls: {
				listHeight: 'Large', // default to Large
			},
		},
		user: user,
	});
	return data;
};

export const useCreateEventMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(createEvent, {
		onSuccess: () => {
			queryClient.invalidateQueries(['events']);
		},
	});
};
