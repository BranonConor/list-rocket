import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getCurrentEvent = async (eventId: string) => {
	const { data } = await axios.get(`/api/events/${eventId}`);
	return data;
};

export const useGetCurrentEventQuery = (eventId: string) => {
	return useQuery(['events', eventId], () => getCurrentEvent(eventId), {
		enabled: !!eventId,
	});
};
