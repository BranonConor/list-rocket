import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface EditEventParams {
	name: string;
	description: string;
	eventId: string;
}

const editEvent = async ({ name, description, eventId }: EditEventParams) => {
	const { data } = await axios.put(`/api/events/${eventId}`, {
		data: {
			name,
			description,
		},
		eventId,
		action: 'event-info-update',
	});
	return data;
};

export const useEditEventMutation = () => {
	return useMutation(editEvent);
};
