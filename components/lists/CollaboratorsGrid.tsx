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
	const { currentEvent, clearWorkspace, prepWorkspace } =
		useContext(WorkspaceContext);
	const [isAddCollaboratorButtonClicked, setIsAddCollaboratorButtonClicked] =
		useState(false);
	const [
		editCollaboratorsButtonIsClicked,
		setEditCollaboratorsButtonIsClicked,
	] = useState(false);
	const [deleteCollaboratorDialogIsOpen, setDeleteCollaboratorDialogIsOpen] =
		useState(false);

	const [userToDelete, setUserToDelete] = useState<{
		id: string;
		name: string;
	} | null>(null);

	//Removing a collaborator from an event
	const handleDelete = async (e: any, eventId: string, userId: string) => {
		e?.preventDefault();
		try {
			await axios.put(`/api/events/${eventId}`, {
				data: {
					eventId: eventId,
					userId: userId,
					action: 'remove-collaborator',
				},
			});
			setEditCollaboratorsButtonIsClicked(false);
			setDeleteCollaboratorDialogIsOpen(false);

			//TODO - make it a pusher event
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
								dimensions='40px'
							/>
							{editCollaboratorsButtonIsClicked && (
								<StyledDeleteCollaboratorButton
									onClick={() => {
										setDeleteCollaboratorDialogIsOpen(true);
										setUserToDelete({
											id: collaborator._id,
											name: collaborator.name,
										});
									}}>
									<img src='/icons/trash-red.svg' alt='' />
								</StyledDeleteCollaboratorButton>
							)}
						</StyledAvatar>
					);
				})}
				{currentEvent.pendingCollaborators?.map((collaborator) => {
					return (
						<StyledPendingAvatar
							key={collaborator._id}
							isInEditMode={editCollaboratorsButtonIsClicked}>
							<ProfilePhoto
								photo={collaborator.image}
								dimensions='40px'
							/>
							<StyledPendingDot />
							{editCollaboratorsButtonIsClicked && (
								<StyledDeleteCollaboratorButton
									onClick={() => {
										setDeleteCollaboratorDialogIsOpen(true);
										setUserToDelete({
											id: collaborator._id,
											name: collaborator.name,
										});
									}}>
									<img src='/icons/trash-red.svg' alt='' />
								</StyledDeleteCollaboratorButton>
							)}
						</StyledPendingAvatar>
					);
				})}
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
			{deleteCollaboratorDialogIsOpen && (
				<Dialog
					title='Delete Event'
					description={`Are you sure you want to remove ${userToDelete?.name} from the event? All their list data will be lost.`}
					cta={(e: any) =>
						handleDelete(e, currentEvent?._id, userToDelete?.id)
					}
					buttonText='Delete'
					setDialogIsOpen={setDeleteCollaboratorDialogIsOpen}
					showCancelButton
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
	margin: 16px 0 16px 0;

	&:hover {
		button {
			filter: grayscale(0%);
		}
	}
`;
const StyledH2 = styled(Title)`
	margin: 0 16px 0 0;

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

	img {
		opacity: ${isInEditMode ? '1' : '0.4'};
	}

	&:hover {
		transform: scale(1.1);
	}

	img {
		filter: ${isInEditMode ? 'grayscale(100%)' : 'none'};
		transform: ${isInEditMode ? 'scale(1.2)' : 'none'};
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
	transform: translateY(-2px);

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
	bottom: 2px;
	right: 2px;
	width: 8px;
	height: 8px;
	background: #decd32;
	border-radius: 100%;
	border: 3px solid white;
`;
const StyledDeleteCollaboratorButton = styled.button`
	border: none;
	outline: none;
	background: none;
	position: absolute;
	top: 6px;
	left: 10px;
	z-index: 10;
	width: 14px;
	height: 14px;
	cursor: pointer;

	img {
		width: 16px;
		height: 16px;
		filter: grayscale(0%);
		background: rgba(250, 250, 250, 0.85);
		border-radius: 100%;
		padding: 4px;
	}
`;
