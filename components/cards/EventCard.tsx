import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { Dispatch, SetStateAction, useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { useRouter } from 'next/router';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { IUser } from '../../contexts/types';

interface IProps {
	name: string;
	description: string;
	creator: IUser;
	id: string;
	animationFactor: number;
	setDeleteDialogIsOpen: Dispatch<SetStateAction<boolean>>;
	setEventToDelete: Dispatch<SetStateAction<{ id: string; name: string }>>;
}

export const EventCard: React.FC<IProps> = (props) => {
	const {
		name,
		description,
		id,
		animationFactor,
		setDeleteDialogIsOpen,
		setEventToDelete,
	} = props;
	const { prepWorkspace } = useContext(WorkspaceContext);

	const router = useRouter();

	const handleClick = async (e) => {
		e?.preventDefault();
		prepWorkspace(id);
		router.push('/workspace');
	};

	const handleDelete = () => {
		setDeleteDialogIsOpen(true);
		setEventToDelete({ id: id, name: name });
	};

	return (
		<StyledCard
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{
				duration: 0.125 * (animationFactor + 0.5),
				type: 'spring',
			}}>
			<div>
				<Title variant='heading3'>{name}</Title>
				<Text variant='body1'>{description}</Text>
			</div>

			<StyledButtonContainer>
				<PrimaryButton
					onClick={handleClick}
					content='Enter event'
					variant='small'
				/>
				<StyledDeleteButton onClick={handleDelete}>
					<img src='/icons/trash-red.svg' alt='Trash Icon' />
				</StyledDeleteButton>
			</StyledButtonContainer>
		</StyledCard>
	);
};

const StyledCard = styled(motion.div)(
	({ theme: { colors } }) => `
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 10px;
	box-sizing: border-box;
	text-align: left;
	padding: 16px;
	background: ${colors.bgLight};
	
	&:hover {
		transform: translateY(2px);
	}
`
);

const StyledButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const StyledDeleteButton = styled.button`
	width: 50px;
	background: none;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 8px;
	outline: none;
	border: none;
	transition: 0.1s ease all;
	height: 40px;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		transform: scale(1.15);
	}
`;
