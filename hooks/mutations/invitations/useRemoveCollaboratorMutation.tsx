import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface RemoveCollaboratorParams {
	eventId: string;
	userId: string;
}

const removeCollaborator = async ({
	eventId,
	userId,
}: RemoveCollaboratorParams) => {
	const { data: eventData } = await axios.put(`/api/events/${eventId}`, {
		eventId: eventId,
		userId: userId,
		action: 'remove-collaborator',
	});
	const { data: userData } = await axios.put(`/api/user/${userId}`, {
		eventId: eventId,
		userId: userId,
		action: 'remove-collaborator',
	});

	return { eventData, userData };
};

export const useRemoveCollaboratorMutation = () => {
	return useMutation(removeCollaborator);
};
