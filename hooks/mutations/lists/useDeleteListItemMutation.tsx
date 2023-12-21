import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface DeleteListItemParams {
	listId: string;
	listItemId: string;
}

const deleteListItem = async ({ listId, listItemId }: DeleteListItemParams) => {
	const { data } = await axios.delete(`/api/list-items/${listItemId}`, {
		data: {
			listId,
			action: 'delete-list-item',
		},
	});

	return data;
};

export const useDeleteListItemMutation = (eventId: string) => {
	const queryClient = useQueryClient();
	return useMutation(deleteListItem, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['events', eventId] });
		},
	});
};
