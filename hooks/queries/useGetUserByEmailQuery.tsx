import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getUserByEmail = async (email: string) => {
	const { data } = await axios.get(`/api/user`, {
		params: {
			email,
		},
	});
	return data;
};

export const useGetUserByEmailQuery = (email: string) => {
	return useQuery(['user', email], () => getUserByEmail(email), {
		enabled: !!email,
	});
};
