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

interface IProps {
	name: string;
	description: string;
	link: string;
	resolvedBy: IUser | null;
	animationFactor: number;
	id: string;
	listId: string;
	isCurrentUser: boolean;
}

export const ListItem: React.FC<IProps> = (props) => {
	const {
		name,
		description,
		link,
		resolvedBy,
		animationFactor,
		id,
		listId,
		isCurrentUser,
	} = props;
	const { currentEvent } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);

	// calculate whether or not to show crossed off items
	const itemIsObscured = isCurrentUser && currentEvent.anonymousModeIsOn;
	const itemIsResolved = Boolean(resolvedBy);

	const handleDelete = async (e) => {
		e?.preventDefault();
		try {
			await axios.delete(`/api/lists/${id}`, {
				data: {
					listId: listId,
					listItemId: id,
				},
			});

			//ping Pusher channel
			await axios.post('/api/pusher', {
				event: currentEvent,
				user: user,
				action: 'event-update',
			});

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
			await axios.put(`/api/lists/${id}`, {
				data: {
					listItemId: id,
					userEmail: user?.email,
					action: 'check',
				},
			});

			//ping Pusher channel
			await axios.post('/api/pusher', {
				event: currentEvent,
				user: user,
				action: 'event-update',
			});

			toast.success('Item completed 🚀', {
				toastId: 'completed-list-item-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'completed-list-item-error-toast',
			});
		}
	};

	const handleUncheck = async () => {
		try {
			await axios.put(`/api/lists/${id}`, {
				data: {
					listItemId: id,
					action: 'uncheck',
				},
			});

			//ping Pusher channel
			await axios.post('/api/pusher', {
				event: currentEvent,
				user: user,
				action: 'event-update',
			});

			toast.info('Item restored ✨', {
				toastId: 'restored-list-item-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'restored-list-item-error-toast',
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
			itemIsResolved={itemIsResolved}
			itemIsObscured={itemIsObscured}>
			<StyledContentWrapper>
				<Title variant='heading4'>{name}</Title>
				<Text variant='body2'>{description}</Text>
				<a href={link} target='_blank' rel='noopenner noreferrer'>
					See item
				</a>
			</StyledContentWrapper>
			<StyledButtonContainer>
				{itemIsObscured || !itemIsResolved ? (
					<StyledIconButton onClick={handleCheck}>
						<img
							src='/icons/check-mark.svg'
							alt='Check Mark Icon'
						/>
					</StyledIconButton>
				) : (
					<StyledPhotoButton
						onClick={handleUncheck}
						initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
						animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
						transition={{
							duration: 0.125,
							type: 'spring',
						}}
						whileHover={{
							scale: 1.2,
							transition: { duration: 0.1 },
						}}>
						<ProfilePhoto
							photo={resolvedBy.image}
							dimensions='18px'
						/>
						<StyledCheckmarkWrapper>
							<img
								src='/icons/check-mark-success.svg'
								alt='Check Mark Icon'
							/>
						</StyledCheckmarkWrapper>
					</StyledPhotoButton>
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
	itemIsObscured: boolean;
	itemIsResolved: boolean;
}
const StyledCard = styled(motion.div)<ICardProps>(
	({ itemIsObscured, itemIsResolved, theme: { colors, shadows } }) => `
	position: relative;
    padding: 16px;
    border-radius: 5px;
    margin: 0 0 16px 0;
	transition: 0.10s ease all;
	background: ${colors.white};
	width: 100%;
	box-sizing: border-box;
	display: flex;
	text-decoration: ${
		itemIsResolved ? (itemIsObscured ? 'none' : 'line-through') : 'none'
	};
	text-decoration-color: ${
		itemIsResolved
			? itemIsObscured
				? colors.body
				: colors.font.body2
			: colors.body
	};
	
	p, h4, div a {
		color: ${
			itemIsResolved
				? itemIsObscured
					? colors.body
					: colors.font.body2
				: colors.body
		};
	}

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
	width: 18px;

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
const StyledPhotoButton = styled(motion.button)`
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
