import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getAllEvents = async (userId: string) => {
	const { data } = await axios.get(`/api/events`, {
		params: {
			id: userId,
		},
	});
	return data;
};

export const useGetAllEventsQuery = (userId: string) => {
	return useQuery(['events'], () => getAllEvents(userId), {
		enabled: !!userId,
	});
};
