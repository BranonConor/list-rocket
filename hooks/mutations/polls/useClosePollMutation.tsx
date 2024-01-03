import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ClosePollParams {
	pollId: string;
}

const closePoll = async ({ pollId }: ClosePollParams) => {
	const { data } = await axios.put(`/api/polls/${pollId}`, {
		action: 'close-poll',
	});
	return data;
};

export const useClosePollMutation = () => {
	return useMutation(closePoll);
};
