import { Dispatch, SetStateAction, useContext } from 'react';
import { Dialog } from '../Dialog';
import { useGetUserQuery } from '../../hooks/queries/useGetUserQuery';
import axios from 'axios';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { toast } from 'react-toastify';
import { useRemoveCollaboratorMutation } from '../../hooks/mutations/invitations/useRemoveCollaboratorMutation';

interface IRemoveCollaboratorDialogProps {
	setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
	userToDelete: { id: string; name: string };
	setEditCollaboratorsButtonIsClicked: Dispatch<SetStateAction<boolean>>;
	setDeleteCollaboratorDialogIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const RemoveCollaboratorDialog: React.FC<
	IRemoveCollaboratorDialogProps
> = ({
	setDialogIsOpen,
	userToDelete,
	setEditCollaboratorsButtonIsClicked,
	setDeleteCollaboratorDialogIsOpen,
}) => {
	const { currentEvent } = useContext(WorkspaceContext);
	const { data: collaborator } = useGetUserQuery(userToDelete?.id);
	const { mutate: removeCollaborator } = useRemoveCollaboratorMutation();

	//Removing a collaborator from an event
	const handleDelete = async (e: any, eventId: string, userId: string) => {
		e?.preventDefault();
		try {
			//don't allow removal of the creator or the last collaborator

			removeCollaborator({
				eventId: eventId,
				userId: userId,
			});

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
				user: collaborator,
				action: 'event-update',
			});
			await axios.post('/api/pusher', {
				userId: userId,
				action: 'remove-collaborator',
			});

			setEditCollaboratorsButtonIsClicked(false);
			setDeleteCollaboratorDialogIsOpen(false);

			toast.success('Collaborator removed 👋', {
				toastId: 'remove-collaborator-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'error-delete-event-toast',
			});
		}
	};

	return (
		<Dialog
			title='Remove Collaborator'
			description={`Are you sure you want to remove ${userToDelete?.name} from the event? All their list data will be lost.`}
			cta={(e: any) =>
				handleDelete(e, currentEvent?._id, userToDelete?.id)
			}
			buttonText='Remove'
			setDialogIsOpen={setDialogIsOpen}
			showCancelButton
		/>
	);
};
