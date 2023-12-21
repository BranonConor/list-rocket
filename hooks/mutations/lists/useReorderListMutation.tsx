import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IListItem } from '../../../contexts/types';

interface ReorderListParams {
	listId: string;
	newItems: IListItem[];
}

const reorderList = async ({ newItems, listId }: ReorderListParams) => {
	const { data } = await axios.put(`/api/lists/${listId}`, {
		listId,
		newItems,
		action: 'reorder-list',
	});

	return data;
};

export const useReorderListMutation = () => {
	return useMutation(reorderList);
};
