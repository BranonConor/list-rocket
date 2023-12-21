import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface UncheckListItemMutation {
	listItemId: string;
}

const uncheckListItem = async ({ listItemId }: UncheckListItemMutation) => {
	const { data } = await axios.put(`/api/list-items/${listItemId}`, {
		action: 'uncheck',
	});
	console.log(data);
	return data;
};

export const useUncheckListItemMutation = (eventId: string) => {
	const queryClient = useQueryClient();
	return useMutation(uncheckListItem, {
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['events', eventId] }),
	});
};
