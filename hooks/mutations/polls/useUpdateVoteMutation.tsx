import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IEvent, IUser } from '../../../contexts/types';

interface UpdateVoteParams {
	pollId: string;
	userId: string;
	vote: { user: IUser; option: string };
}

const updateVote = async ({ pollId, vote, userId }: UpdateVoteParams) => {
	const { data } = await axios.put(`/api/polls/${pollId}`, {
		vote,
		userId,
		action: 'vote',
	});
	return data;
};

export const useUpdateVoteMutation = () => {
	return useMutation(updateVote);
};
