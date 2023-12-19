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

export const EventCard: React.FC<IProps> = ({
	name,
	description,
	id,
	animationFactor,
	setDeleteDialogIsOpen,
	setEventToDelete,
}) => {
	const { prepWorkspace } = useContext(WorkspaceContext);
	const router = useRouter();

	const handleClick = async (e) => {
		e?.preventDefault();
		prepWorkspace(id);
		router.push(`/workspace/${id}`);
	};

	const handleDelete = () => {
		setDeleteDialogIsOpen(true);
		setEventToDelete({ id: id, name: name });
	};

	const maxChar = 100;
	const truncatedDescription =
		description.length > maxChar
			? description.slice(0, maxChar).trim().concat('...')
			: description;

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
				<Text variant='body1'>{truncatedDescription}</Text>
			</div>

			<StyledButtonContainer>
				<PrimaryButton
					onClick={handleClick}
					content='Enter event'
					variant='small'
				/>
				<StyledDeleteButton onClick={handleDelete}>
					<StyledImage src='/icons/trash-red.svg' alt='Trash Icon' />
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

		button {
			filter: grayscale(0%);
		}
	}

	h3 {
		margin-top: 8px;
	}
`
);

const StyledButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const StyledDeleteButton = styled.button(
	({ theme: { colors } }) => `
	width: 40px;
	height: 40px;
	border-radius: 5px;
	box-sizing: border-box;
	outline: none;
	border: none;
	background: ${colors.error.bg};
	filter: grayscale(100%);


	&:hover {
		cursor: pointer;

		img {
			transform: scale(1.15);
		}
	}
`
);
const StyledImage = styled.img`
	width: 16px;
	height: 16px;
	transition: 0.1s ease all;
`;
