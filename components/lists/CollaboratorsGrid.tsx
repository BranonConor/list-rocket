import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { ProfilePhoto } from '../ProfilePhoto';
import { AddCollaborator } from '../events/AddCollaborator';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Title } from '../typography/Title';

export const CollaboratorsGrid = () => {
	const { currentEvent } = useContext(WorkspaceContext);
	const [isAddCollaboratorButtonClicked, setIsAddCollaboratorButtonClicked] =
		useState(false);
	const [
		editCollaboratorsButtonIsClicked,
		setEditCollaboratorsButtonIsClicked,
	] = useState(false);

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
						<StyledButton
							key={collaborator._id}
							isInEditMode={editCollaboratorsButtonIsClicked}>
							<ProfilePhoto
								photo={collaborator.image}
								dimensions='40px'
							/>
						</StyledButton>
					);
				})}
				{currentEvent.pendingCollaborators?.map((collaborator) => {
					return (
						<StyledPendingButton
							key={collaborator._id}
							isInEditMode={editCollaboratorsButtonIsClicked}>
							<ProfilePhoto
								photo={collaborator.image}
								dimensions='40px'
							/>
							<StyledPendingDot />
						</StyledPendingButton>
					);
				})}
				{!isAddCollaboratorButtonClicked && (
					<>
						{editCollaboratorsButtonIsClicked ? (
							<StyledCollaboratorControlsButton
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
									onClick={() =>
										setEditCollaboratorsButtonIsClicked(
											!editCollaboratorsButtonIsClicked
										)
									}>
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

interface IStyledButtonProps {
	isInEditMode: boolean;
}
const StyledButton = styled.button<IStyledButtonProps>(
	({ isInEditMode }) => `
	outline: none;
	border: none;
	background: none;
	transition: 0.15s ease all;
	padding: 0 4px;
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
const StyledPendingButton = styled.button<IStyledButtonProps>(
	({ isInEditMode }) => `
	outline: none;
	border: none;
	background: none;
	transition: 0.15s ease all;
	padding:  ${isInEditMode ? '0 8px' : '0 4px'};
	position: relative;
	cursor: pointer;

	img {
		opacity: 0.4;
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
const StyledCollaboratorControlsButton = styled.button`
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background: none;
	transition: 0.15s ease all;
	filter: grayscale(100%);
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
`;
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
