import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface DeleteListParams {
	listId: string;
	eventId: string;
}

const deleteList = async ({ listId, eventId }: DeleteListParams) => {
	const { data: listData } = await axios.delete(`/api/lists/${listId}`, {
		data: {
			action: 'delete-list',
		},
	});
	//ping the events API to update it by removing this list from its lists
	const { data: eventData } = await axios.put(`/api/events/${eventId}`, {
		listId,
		action: 'delete-list',
	});

	return { listData, eventData };
};

export const useDeleteListMutation = () => {
	return useMutation(deleteList);
};
