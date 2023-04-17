import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Text } from '../typography/Text';
import { Title } from '../typography/Title';
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { UserContext } from '../../contexts/UserContext';
import { IUser } from '../../contexts/types';
import { ProfilePhoto } from '../ProfilePhoto';

interface Props {
	name: string;
	description: string;
	link: string;
	resolvedBy: IUser | null;
	animationFactor: number;
	id: string;
	listId: string;
}

export const ListItem: React.FC<Props> = (props) => {
	const { name, description, link, resolvedBy, animationFactor, id, listId } =
		props;
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);

	const handleDelete = async (e) => {
		e?.preventDefault();
		try {
			const res = await axios.delete(`/api/lists/${id}`, {
				data: {
					listId: listId,
					listItemId: id,
				},
			});
			prepWorkspace(currentEvent._id);
			toast.success('Successfully deleted your item 🗑', {
				toastId: 'delete-list-item-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'error-delete-list-item-toast',
			});
		}
	};

	const handleEdit = () => {
		alert('editing coming soon!');
	};

	const handleCheck = async () => {
		try {
			const res = await axios.put(`/api/lists/${id}`, {
				data: {
					listItemId: id,
					userEmail: user?.email,
				},
			});
			prepWorkspace(currentEvent._id);
			toast.success('Successfully completed this item ✅', {
				toastId: 'completed-list-item-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'completed-list-item-error-toast',
			});
		}
	};

	//TODO - adjust this to uncheck the resolvedBy user
	const handleUncheck = async () => {
		try {
			const res = await axios.put(`/api/lists/${id}`, {
				data: {
					listItemId: id,
					userEmail: user?.email,
				},
			});
			prepWorkspace(currentEvent._id);
			toast.success('Successfully completed this item ✅', {
				toastId: 'completed-list-item-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'completed-list-item-error-toast',
			});
		}
	};

	return (
		<StyledCard
			initial={{
				top: -20,
				opacity: 0,
			}}
			animate={{
				top: 0,
				opacity: 1,
			}}
			transition={{
				delay: 0.1 + 0.05 * animationFactor,
				duration: 0.5,
				type: 'spring',
			}}
			resolvedBy={true}>
			<StyledContentWrapper>
				<Title variant='heading4'>{name}</Title>
				<Text variant='body2'>{description}</Text>
				<a href={link} target='_blank' rel='noopenner noreferrer'>
					See item
				</a>
			</StyledContentWrapper>
			<StyledButtonContainer>
				{resolvedBy ? (
					<StyledPhotoButton onClick={handleUncheck}>
						<ProfilePhoto
							photo={resolvedBy.image}
							dimensions='18px'
						/>
						<StyledCheckmarkWrapper>
							<img
								src='/icons/check-mark.svg'
								alt='Check Mark Icon'
							/>
						</StyledCheckmarkWrapper>
					</StyledPhotoButton>
				) : (
					<StyledIconButton onClick={handleCheck}>
						<img
							src='/icons/check-mark.svg'
							alt='Check Mark Icon'
						/>
					</StyledIconButton>
				)}
				<StyledIconButton onClick={handleEdit}>
					<img src='/icons/pencil.svg' alt='Edit Icon' />
				</StyledIconButton>
				<StyledIconButton onClick={handleDelete}>
					<img src='/icons/trash-red.svg' alt='Trash Icon' />
				</StyledIconButton>
			</StyledButtonContainer>
		</StyledCard>
	);
};

interface ICardProps {
	resolvedBy: boolean;
}
const StyledCard = styled(motion.div)<ICardProps>(
	({ resolvedBy, theme: { colors, shadows } }) => `
	position: relative;
    padding: 16px;
    border-radius: 5px;
    margin: 0 0 16px 0;
	transition: 0.10s ease all;
	background: ${colors.white};
	width: 100%;
	box-sizing: border-box;
	display: flex;
	text-decoration: ${resolvedBy ? 'line-through' : 'none'};

	&:hover {
		box-shadow: ${shadows.standard};
		transform: translateY(-2px);

		img {
			filter: grayscale(0%);
		}
	}

	& a {
		color: ${colors.link.default};
		
		&:hover {
			color: ${colors.link.hover};
		}
	}
	`
);
const StyledButtonContainer = styled.div`
	box-sizing: border-box;
	transition: 0.1s ease all;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding-left: 16px;
`;
const StyledIconButton = styled.button`
	background: none;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 0;
	outline: none;
	border: none;
	transition: 0.1s ease all;
	height: 34px;
	width: 100%;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		transform: scale(1.25);
	}
	img {
		filter: grayscale(100%);
		width: 14px;
		height: 14px;
	}
`;
const StyledContentWrapper = styled.div(
	({ theme: { colors } }) => `
	width: 100%;
	padding-right: 16px;
	border-right: 1px solid ${colors.bgLight};
`
);
const StyledPhotoButton = styled.button`
	position: relative;
	background: none;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 0;
	outline: none;
	border: none;
	transition: 0.1s ease all;
	height: 34px;
	width: 100%;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		transform: scale(1.25);
	}
`;
const StyledCheckmarkWrapper = styled.div`
	position: absolute;
	top: 14px;
	right: -4px;
	z-index: 2;

	img {
		width: 14px;
		height: 14px;
	}
`;
