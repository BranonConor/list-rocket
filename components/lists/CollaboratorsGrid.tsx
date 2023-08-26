import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { ProfilePhoto } from '../ProfilePhoto';
import { AddCollaborator } from '../events/AddCollaborator';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Title } from '../typography/Title';
import { Dialog } from '../Dialog';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CollaboratorsGrid = () => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const [isAddCollaboratorButtonClicked, setIsAddCollaboratorButtonClicked] =
		useState(false);
	const [
		editCollaboratorsButtonIsClicked,
		setEditCollaboratorsButtonIsClicked,
	] = useState(false);
	const [deleteCollaboratorDialogIsOpen, setDeleteCollaboratorDialogIsOpen] =
		useState(false);
	const [
		blockCreatorDeletionDialogIsOpen,
		setBlockCreatorDeletionDialogIsOpen,
	] = useState(false);

	const [userToDelete, setUserToDelete] = useState<{
		id: string;
		name: string;
	} | null>(null);

	//Removing a collaborator from an event
	const handleDelete = async (e: any, eventId: string, userId: string) => {
		e?.preventDefault();
		try {
			//don't allow removal of the creator or the last collaborator

			await axios.put(`/api/events/${eventId}`, {
				eventId: eventId,
				userId: userId,
				action: 'remove-collaborator',
			});
			await axios.put(`/api/user/${userId}`, {
				eventId: currentEvent._id,
				userId: userId,
				action: 'remove-collaborator',
			});

			//ping Pusher channel
			const collaborator = await axios.get(`/api/user?=${userId}`);
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

			//TODO - make it a pusher event so everyone gets the update in real time
			prepWorkspace(eventId);

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
		<StyledGrid
			initial={{
				top: -20,
				opacity: 0,
			}}
			animate={{
				top: 0,
				opacity: 1,
			}}
			transition={{
				delay: 0.1,
				duration: 0.5,
				type: 'spring',
			}}>
			<StyledCollaboratorsWrapper>
				<StyledH2 variant='heading3'>Collaborators:</StyledH2>
				{currentEvent.collaborators?.map((collaborator) => {
					return (
						<StyledAvatar
							key={collaborator._id}
							isInEditMode={editCollaboratorsButtonIsClicked}>
							<ProfilePhoto
								photo={collaborator.image}
								dimensions='24px'
							/>
							{editCollaboratorsButtonIsClicked && (
								<StyledDeleteCollaboratorButton
									initial={{
										top: -8,
										opacity: 0,
									}}
									animate={{
										top: 16,
										opacity: 1,
									}}
									transition={{
										delay: 0.1,
										duration: 0.5,
										type: 'spring',
									}}
									onClick={() => {
										if (
											collaborator._id ===
											currentEvent.creator._id
										) {
											setBlockCreatorDeletionDialogIsOpen(
												true
											);
										} else {
											setDeleteCollaboratorDialogIsOpen(
												true
											);
											setUserToDelete({
												id: collaborator._id,
												name: collaborator.name,
											});
										}
									}}>
									<img
										src='/icons/trash-red.svg'
										alt='remove collaborator'
									/>
								</StyledDeleteCollaboratorButton>
							)}
						</StyledAvatar>
					);
				})}

				{/* ---- PENDING COLLABORATORS ----- */}
				{currentEvent.pendingCollaborators?.map((collaborator) => {
					return (
						<StyledPendingAvatar
							key={collaborator._id}
							isInEditMode={editCollaboratorsButtonIsClicked}>
							<ProfilePhoto
								photo={collaborator.image}
								dimensions='24px'
							/>
							<StyledPendingDot />
							{editCollaboratorsButtonIsClicked && (
								<StyledDeleteCollaboratorButton
									initial={{
										top: -8,
										opacity: 0,
									}}
									animate={{
										top: 16,
										opacity: 1,
									}}
									transition={{
										delay: 0.1,
										duration: 0.5,
										type: 'spring',
									}}
									onClick={() => {
										setDeleteCollaboratorDialogIsOpen(true);
										setUserToDelete({
											id: collaborator._id,
											name: collaborator.name,
										});
									}}>
									<img
										src='/icons/trash-red.svg'
										alt='remove collaborator'
									/>
								</StyledDeleteCollaboratorButton>
							)}
						</StyledPendingAvatar>
					);
				})}

				{isAddCollaboratorButtonClicked && (
					<AddCollaborator
						isAddCollaboratorButtonClicked={
							isAddCollaboratorButtonClicked
						}
						setIsAddCollaboratorButtonClicked={
							setIsAddCollaboratorButtonClicked
						}
					/>
				)}

				{/* ---- COLLABORATORS CONTROLS BUTTONS ----- */}
				{!isAddCollaboratorButtonClicked && (
					<>
						{editCollaboratorsButtonIsClicked ? (
							<StyledCollaboratorControlsButton
								isInEditMode={editCollaboratorsButtonIsClicked}
								onClick={() =>
									setEditCollaboratorsButtonIsClicked(
										!editCollaboratorsButtonIsClicked
									)
								}>
								{' '}
								<img
									src='/icons/x.svg'
									alt='Add Collaborator'
									draggable={false}
								/>
							</StyledCollaboratorControlsButton>
						) : (
							<>
								<StyledCollaboratorControlsButton
									isInEditMode={
										editCollaboratorsButtonIsClicked
									}
									onClick={() => {
										setIsAddCollaboratorButtonClicked(true);
										setEditCollaboratorsButtonIsClicked(
											false
										);
									}}>
									<img
										src='/icons/add.svg'
										alt='Add Collaborator'
										draggable={false}
									/>
								</StyledCollaboratorControlsButton>
								<StyledCollaboratorControlsButton
									isInEditMode={
										editCollaboratorsButtonIsClicked
									}
									onClick={() => {
										setEditCollaboratorsButtonIsClicked(
											!editCollaboratorsButtonIsClicked
										);
										setUserToDelete(null);
									}}>
									<img
										src='/icons/pencil.svg'
										alt='Add Collaborator'
										draggable={false}
									/>
								</StyledCollaboratorControlsButton>
							</>
						)}
					</>
				)}
			</StyledCollaboratorsWrapper>
			{deleteCollaboratorDialogIsOpen && (
				<Dialog
					title='Remove Collaborator'
					description={`Are you sure you want to remove ${userToDelete?.name} from the event? All their list data will be lost.`}
					cta={(e: any) =>
						handleDelete(e, currentEvent?._id, userToDelete?.id)
					}
					buttonText='Remove'
					setDialogIsOpen={setDeleteCollaboratorDialogIsOpen}
					showCancelButton
				/>
			)}
			{blockCreatorDeletionDialogIsOpen && (
				<Dialog
					title='Cannot Remove Event Creator'
					description="Sorry, you can't remove the event creator from the event!"
					buttonText='Got it!'
					setDialogIsOpen={setBlockCreatorDeletionDialogIsOpen}
				/>
			)}
		</StyledGrid>
	);
};

const StyledGrid = styled(motion.div)`
	width: 100%;
`;
const StyledCollaboratorsWrapper = styled(motion.div)`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
	min-height: 40px;
	margin: 0 0 16px 0;

	&:hover {
		button {
			filter: grayscale(0%);
		}
	}
`;
const StyledH2 = styled(Title)`
	margin: 0 16px 0 0;
	min-height: 40px;
	display: flex;
	align-items: center;

	@media only screen and (max-width: 768px) {
		margin: 0 8px 0 0;
	}
`;

interface IStyledAvatarProps {
	isInEditMode: boolean;
}
const StyledAvatar = styled.div<IStyledAvatarProps>(
	({ isInEditMode }) => `
	outline: none;
	border: none;
	background: none;
	transition: 0.15s ease all;
	padding:  ${isInEditMode ? '0 8px' : '0 4px'};
	box-sizing: border-box;
	position: relative;
	cursor: pointer;
	display: flex;
	align-items: center;

	&:hover {
		transform: scale(1.1);
	}

	img {
		filter: ${isInEditMode ? 'grayscale(100%)' : 'none'};
		transform: ${isInEditMode ? 'scale(1.2)' : 'none'};
	}
`
);
const StyledPendingAvatar = styled.div<IStyledAvatarProps>(
	({ isInEditMode }) => `
	outline: none;
	border: none;
	background: none;
	transition: 0.15s ease all;
	box-sizing: border-box;
	padding:  ${isInEditMode ? '0 8px' : '0 4px'};
	position: relative;
	cursor: pointer;
	display: flex;
	align-items: center;

	img {
		opacity: ${isInEditMode ? '1' : '0.4'};
	}

	&:hover {
		transform: scale(1.1);
	}

	img {
		filter: ${isInEditMode ? 'grayscale(100%)' : 'none'};
		transform: ${isInEditMode ? 'scale(1.25)' : 'none'};
	}
`
);
const StyledCollaboratorControlsButton = styled.button<IStyledAvatarProps>(
	({ isInEditMode }) => `
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background: none;
	transition: 0.15s ease all;
	filter: ${isInEditMode ? 'grayscale(0%)' : 'grayscale(100%)'};
	padding: 0 0 0 12px;

	&:hover {
		cursor: pointer;
		transform: scale(1.15) translateY(-2px);
	}

	img {
		width: 16px;
		height: 16px;
	}
`
);
const StyledPendingDot = styled.div`
	position: absolute;
	bottom: -4px;
	right: 2px;
	width: 8px;
	height: 8px;
	background: #decd32;
	border-radius: 100%;
	border: 3px solid white;
`;
const StyledDeleteCollaboratorButton = styled(motion.button)(
	({ theme: { shadows } }) => `
	border: none;
	outline: none;
	background: none;
	position: absolute;
	left: 4px;
	z-index: 10;
	cursor: pointer;

	img {
		width: 12px;
		height: 12px;
		filter: grayscale(0%);
		background: rgba(250, 250, 250, 1);
		box-shadow: ${shadows.standard};
		border-radius: 100%;
		padding: 4px;
	}
`
);
