import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getEvent = async (eventId: string) => {
	const { data } = await axios.get(`/api/events/${eventId}`);
	return data.data;
};

export const useGetEventQuery = (eventId: string) => {
	return useQuery(['event', eventId], () => getEvent(eventId), {
		enabled: !!eventId,
	});
};
