import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface UpdateAnonymousModeParams {
	eventId: string;
}

const updateAnonymousMode = async ({ eventId }: UpdateAnonymousModeParams) => {
	const { data } = await axios.put(`/api/events/${eventId}`, {
		eventId,
		action: 'anonymous-mode-toggle',
	});
	return data;
};

export const useUpdateAnonymousModeMutation = () => {
	return useMutation(updateAnonymousMode);
};
