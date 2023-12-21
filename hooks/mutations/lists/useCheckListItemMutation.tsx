import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface ChecklistItemMutation {
	email: string;
	listItemId: string;
}

const checkListItem = async ({ email, listItemId }: ChecklistItemMutation) => {
	const { data } = await axios.put(`/api/list-items/${listItemId}`, {
		data: {
			email,
		},
		action: 'check',
	});

	return data;
};

export const useCheckListItemMutation = (eventId: string) => {
	const queryClient = useQueryClient();
	return useMutation(checkListItem, {
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['events', eventId] }),
	});
};
