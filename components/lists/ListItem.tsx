import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Text } from '../typography/Text';
import { Title } from '../typography/Title';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { UserContext } from '../../contexts/UserContext';
import { IUser } from '../../contexts/types';
import { ProfilePhoto } from '../ProfilePhoto';
import { Dialog } from '../Dialog';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDeleteListItemMutation } from '../../hooks/mutations/lists/useDeleteListItemMutation';
import { useCheckListItemMutation } from '../../hooks/mutations/lists/useCheckListItemMutation';
import { useUncheckListItemMutation } from '../../hooks/mutations/lists/useUncheckListItemMutation copy';

interface IProps {
	name: string;
	description: string;
	link: string;
	resolvedBy: IUser | null;
	id: string;
	listId: string;
	isCurrentUser: boolean;
	setCurrentItemBeingEdited: Dispatch<SetStateAction<string>>;
	listItems: string[];
	setListItems: Dispatch<SetStateAction<string[]>>;
}

export const ListItem: React.FC<IProps> = (props) => {
	const {
		name,
		description,
		link,
		resolvedBy,
		id,
		listId,
		isCurrentUser,
		setCurrentItemBeingEdited,
		listItems,
		setListItems,
	} = props;
	const { currentEvent } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);
	const { mutate: deleteListItem } = useDeleteListItemMutation(
		currentEvent._id
	);
	const { mutate: checkListItem } = useCheckListItemMutation(
		currentEvent._id
	);
	const { mutate: uncheckListItem } = useUncheckListItemMutation(
		currentEvent._id
	);

	//dialog state
	const [dialogIsOpen, setDialogIsOpen] = useState(false);

	// calculate whether or not to show crossed off items
	const itemIsObscured =
		isCurrentUser && currentEvent?.controls?.anonymousModeIsOn;
	const itemIsResolved = Boolean(resolvedBy);

	//dndkit code
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });
	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	const handleDelete = async (e) => {
		e?.preventDefault();
		try {
			deleteListItem({ listId: listId, listItemId: id });

			setListItems(listItems.filter((item) => item !== id));

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
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
		setCurrentItemBeingEdited(id);
	};

	const handleCheck = async () => {
		try {
			checkListItem({ listItemId: id, email: user?.email });

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
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
			uncheckListItem({ listItemId: id });

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
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
		<>
			<StyledCard
				initial={{
					top: 10,
				}}
				animate={{
					top: 0,
				}}
				transition={{
					duration: 0.2,
					type: 'spring',
				}}
				itemIsResolved={itemIsResolved}
				itemIsObscured={itemIsObscured}
				ref={setNodeRef}
				style={style}
				isDragging={isDragging}>
				<StyledContentWrapper {...attributes} {...listeners}>
					<Title variant='heading6'>{name}</Title>
					<Text variant='body2'>{description}</Text>
					{link === '' ? null : (
						<a
							href={link}
							target='_blank'
							rel='noopenner noreferrer'>
							See item
						</a>
					)}
				</StyledContentWrapper>
				<StyledButtonContainer>
					{itemIsObscured ? (
						<StyledIconButton onClick={() => setDialogIsOpen(true)}>
							<img src='/icons/hidden.svg' alt='Hidden item' />
						</StyledIconButton>
					) : itemIsResolved ? (
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
			{dialogIsOpen && (
				<Dialog
					title='Anonymous mode'
					description="This event is currently in Anonymous Mode. This means each user can see the status of everyone's list items except their own."
					buttonText='Got it!'
					setDialogIsOpen={setDialogIsOpen}
				/>
			)}
		</>
	);
};

interface ICardProps {
	itemIsObscured: boolean;
	itemIsResolved: boolean;
	isListCollapsed?: boolean;
	isDragging: boolean;
}
const StyledCard = styled(motion.div)<ICardProps>(
	({ isDragging, itemIsObscured, itemIsResolved, theme: { colors } }) => `
	position: relative;
    padding: 16px;
    border-radius: 5px;
	background: ${colors.white};
	border: ${isDragging ? `4px solid ${colors.chip.defaultBg}` : 'none'};
	width: 100%;
	box-sizing: border-box;
	display: flex;
	transition: 0.05s ease all;
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
	z-index: ${isDragging ? '10' : '1'};
	
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
	transition: 0.25s ease all;
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
	overflow: hidden;
	padding-right: 16px;
	border-right: 1px solid ${colors.bgLight};
	touch-action: manipulation;
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
