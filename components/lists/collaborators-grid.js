import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext } from 'react';
import ProfilePhoto from '../profile-photo';
import AddCollaboratorForm from '../events/AddCollaboratorForm';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Title } from '../typography/Title.tsx';

const CollaboratorsGrid = () => {
	const { currentEvent } = useContext(WorkspaceContext);
	console.log('Collaborators: ', currentEvent.collaborators);

	return (
		<StyledGrid
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeIn', duration: '0.25', type: 'spring' }}>
			<StyledCollaboratorsWrapper>
				<StyledH2 variant='heading3'>Collaborators:</StyledH2>
				{currentEvent.collaborators.length > 0
					? currentEvent.collaborators.map((collaborator) => {
							return (
								<StyledButton key={collaborator._id}>
									<ProfilePhoto
										photo={collaborator.image}
										dimensions={40}
									/>
								</StyledButton>
							);
					  })
					: ' none yet! 👀'}
			</StyledCollaboratorsWrapper>
			<AddCollaboratorForm />
		</StyledGrid>
	);
};

export default CollaboratorsGrid;

const StyledGrid = styled(motion.div)`
	width: 100%;
`;
const StyledCollaboratorsWrapper = styled(motion.div)`
	display: flex;
	align-items: center;
	width: 100%;
	margin: 16px 0;
`;
const StyledH2 = styled(Title)`
	margin: 0 16px 0 0;
`;
const StyledButton = styled.button`
	outline: none;
	border: none;
	background: none;
	transition: 0.15s ease all;

	&:hover {
		cursor: pointer;

		img {
			transform: scale(1.1);
		}
	}
`;
