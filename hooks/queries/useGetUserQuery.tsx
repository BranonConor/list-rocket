import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getUser = async (id: string) => {
	const { data } = await axios.get(`/api/user/${id}`);
	return data.data;
};

export const useGetUserQuery = (id: string) => {
	return useQuery(['user', id], () => getUser(id), {
		enabled: !!id,
	});
};
