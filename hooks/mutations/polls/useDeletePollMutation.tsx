import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface DeletePollParams {
	pollId: string;
	eventId: string;
}

const deletePoll = async ({ pollId, eventId }: DeletePollParams) => {
	const { data: pollData } = await axios.delete(`/api/polls/${pollId}`, {
		data: {
			eventId,
		},
	});

	return pollData;
};

export const useDeletePollMutation = () => {
	return useMutation(deletePoll);
};
