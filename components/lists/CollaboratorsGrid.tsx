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
						<StyledButton key={collaborator._id}>
							<ProfilePhoto
								photo={collaborator.image}
								dimensions='40px'
							/>
						</StyledButton>
					);
				})}
				{currentEvent.pendingCollaborators?.map((collaborator) => {
					return (
						<StyledPendingButton key={collaborator._id}>
							<ProfilePhoto
								photo={collaborator.image}
								dimensions='40px'
							/>
							<StyledPendingDot />
						</StyledPendingButton>
					);
				})}
				{!isAddCollaboratorButtonClicked && (
					<StyledAddCollaboratorButton
						onClick={() => setIsAddCollaboratorButtonClicked(true)}>
						<img src='/icons/add.svg' alt='Add Collaborator' />
					</StyledAddCollaboratorButton>
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
`;
const StyledH2 = styled(Title)`
	margin: 0 16px 0 0;

	@media only screen and (max-width: 768px) {
		margin: 0 8px 0 0;
	}
`;
const StyledButton = styled.button`
	outline: none;
	border: none;
	background: none;
	transition: 0.15s ease all;
	padding: 0 4px;

	&:hover {
		cursor: pointer;

		img {
			transform: scale(1.1);
		}
	}
`;
const StyledPendingButton = styled.button`
	outline: none;
	border: none;
	background: none;
	transition: 0.15s ease all;
	padding: 0 4px;
	position: relative;
	cursor: pointer;

	img {
		opacity: 0.4;
	}

	&:hover {
		transform: scale(1.1);
	}
`;
const StyledAddCollaboratorButton = styled.button`
	padding: 8px;
	margin: 0;
	height: 40px;
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background: none;
	transition: 0.15s ease all;

	&:hover {
		cursor: pointer;
		transform: scale(1.15);
	}

	img {
		transform: translateY(-2px);
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
