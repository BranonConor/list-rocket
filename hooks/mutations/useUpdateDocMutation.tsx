import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface UpdateDocParams {
	docData: string;
	eventId: string;
}

const updateDoc = async ({ docData, eventId }: UpdateDocParams) => {
	const { data } = await axios.put(`/api/events/${eventId}`, {
		docData,
		action: 'update-doc',
	});
	return data;
};

export const useUpdateDocMutation = () => {
	return useMutation(updateDoc);
};
