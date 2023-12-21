import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface AddCustomNameParams {
	name: string;
	listId: string;
}

const addCustomName = async ({ name, listId }: AddCustomNameParams) => {
	const { data } = await axios.put(`/api/lists/${listId}`, {
		name,
		listId,
		action: 'add-custom-list-creator',
	});

	return data;
};

export const useAddCustomNameMutation = () => {
	return useMutation(addCustomName);
};
