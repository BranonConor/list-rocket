import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getUser = async (email: string) => {
	const { data } = await axios.get(`/api/user`, {
		params: {
			email,
		},
	});
	return data;
};

export const useGetUserQuery = (email: string) => {
	return useQuery(['user', email], () => getUser(email), {
		enabled: !!email,
	});
};
