import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface EditListItemParams {
	name: string;
	description: string;
	link: string;
	listItemId: string;
}

const editListItem = async ({
	name,
	description,
	link,
	listItemId,
}: EditListItemParams) => {
	const { data } = await axios.put(`/api/list-items`, {
		data: {
			name,
			description,
			link,
		},
		listItemId,
	});

	return data;
};

export const useEditListItemMutation = () => {
	return useMutation(editListItem);
};
