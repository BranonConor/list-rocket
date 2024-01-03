import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IEvent, IUser } from '../../../contexts/types';

interface AddPollParams {
	creator: IUser;
	title: string;
	options: string[];
	votes?: { user: IUser; vote: string }[];
	event: IEvent;
	isOpen: boolean;
}

const addPoll = async ({
	creator,
	title,
	options,
	votes,
	event,
	isOpen,
}: AddPollParams) => {
	const { data } = await axios.post(`/api/polls`, {
		creator,
		title,
		options,
		votes: votes,
		event,
		isOpen,
	});
	return data;
};

export const useAddPollMutation = () => {
	return useMutation(addPoll);
};
