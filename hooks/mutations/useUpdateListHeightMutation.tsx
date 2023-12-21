import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface UpdateListHeightParams {
	listHeight: string;
	eventId: string;
}

const updateListHeight = async ({
	listHeight,
	eventId,
}: UpdateListHeightParams) => {
	const { data } = await axios.put(`/api/events/${eventId}`, {
		listHeight,
		action: 'list-height-change',
	});
	return data;
};

export const useUpdateListHeightMutation = () => {
	return useMutation(updateListHeight);
};
