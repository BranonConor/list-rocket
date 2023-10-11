import { Dispatch, SetStateAction, useContext, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { PrimaryButton } from '../buttons/PrimaryButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { motion } from 'framer-motion';
import { UserContext } from '../../contexts/UserContext';

interface IProps {
	listId: string;
	setDeleteListDialogIsOpen: Dispatch<SetStateAction<boolean>>;
	isListCollapsed: boolean;
}

export const ListButtons: React.FC<IProps> = (props) => {
	const { listId, setDeleteListDialogIsOpen, isListCollapsed } = props;
	const { currentEvent } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);
	const [isAddItemClicked, setIsAddItemClicked] = useState<boolean>(false);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [link, setLink] = useState<string>('');

	const handleAddItemClick = () => {
		setIsAddItemClicked(true);
	};
	const handleCancelClick = () => {
		setIsAddItemClicked(false);
	};
	const handleSubmit = async (event: any) => {
		try {
			event.preventDefault();
			if (name === '' || description === '') {
				throw new Error();
			}
			await axios.put(`/api/lists`, {
				listItem: {
					name: name,
					description: description,
					link: link,
					event: currentEvent._id,
					list: listId,
				},
				listId: listId,
			});

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
				user: user,
				action: 'event-update',
			});

			toast.success(`Successfully added new list item! 👍🏽`, {
				toastId: 'added-list-item-toast',
			});
			setName('');
			setDescription('');
			setLink('');
			setIsAddItemClicked(false);
		} catch (axiosError) {
			if (name === '' || description === '') {
				toast.error(`Please fill out all list item fields. 👀`, {
					toastId: 'list-item-value-not-found-toast',
				});
			} else {
				toast.error('Something went wrong, sorry! 😵‍💫', {
					toastId: 'error-creating-list-item-toast',
				});
			}
		}
	};

	return (
		<>
			{isAddItemClicked ? (
				<StyledWrapper
					isListCollapsed={isListCollapsed}
					initial={{
						scale: 0,
						opacity: 0,
						rotate: '15deg',
					}}
					animate={{
						scale: 1,
						opacity: 1,
						rotate: '0deg',
					}}
					transition={{
						duration: 0.125,
						type: 'spring',
					}}>
					<StyledForm onSubmit={handleSubmit}>
						<StyledInput
							value={name}
							placeholder='Add a title'
							name='title'
							required
							onChange={(e) => setName(e.target.value)}
						/>
						<StyledInput
							value={description}
							placeholder='Add a description'
							name='title'
							required
							onChange={(e) => setDescription(e.target.value)}
						/>
						<StyledInput
							value={link}
							placeholder='Add a link'
							name='link'
							onChange={(e) => setLink(e.target.value)}
						/>
						<StyledItemButtonsWrapper>
							<PrimaryButton
								variant='small'
								content='Submit'
								type='submit'
							/>
							<SecondaryButton
								variant='small'
								content='Cancel'
								onClick={handleCancelClick}
							/>
						</StyledItemButtonsWrapper>
					</StyledForm>
				</StyledWrapper>
			) : (
				<StyledListButtonsWrapper isListCollapsed={isListCollapsed}>
					<StyledAddNewIconButton
						id='add-new-item-button'
						onClick={handleAddItemClick}>
						<StyledIcon src='/icons/add-dark.svg' />
					</StyledAddNewIconButton>
					<StyledErrorIconButton
						id='delete-list-button'
						onClick={() => setDeleteListDialogIsOpen(true)}>
						<StyledIcon src='/icons/trash-red.svg' />
					</StyledErrorIconButton>
				</StyledListButtonsWrapper>
			)}
		</>
	);
};
interface IStyledWrapperProps {
	isListCollapsed: boolean;
}
const StyledWrapper = styled(motion.div)<IStyledWrapperProps>(
	({ isListCollapsed, theme: { shadows } }) => `
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: 5px;
	padding: 16px 8px;
	box-sizing: border-box;
    box-shadow: ${shadows.standard};
	height: ${isListCollapsed ? '0px' : '100%'};
	opacity: ${isListCollapsed ? '0' : '1'};
`
);
const StyledForm = styled.form`
	width: 100%;
`;
const StyledInput = styled.input(
	({ theme: { colors, typography } }) => `
	width: 100%;
	box-sizing: border-box;
	padding: 8px;
	margin: 4px 0;
	border: none;
	font-family: Poppins;
    color: ${colors.font.body};

	&:first-of-type {
		font-family: Lalezar;
        font-size: ${typography.size.heading6};
        padding: 4px 8px;
	}
`
);
const StyledListButtonsWrapper = styled.div<IStyledWrapperProps>(
	({ isListCollapsed }) => `
	width: 100%;
	display: flex;
	height: ${isListCollapsed ? '0px' : '100%'};
	overflow: hidden;
	transition: 0.2s ease all;
	opacity: ${isListCollapsed ? '0' : '1'};

	button:first-of-type {
		margin: 0 8px 0 0;
	}
`
);
const StyledItemButtonsWrapper = styled.div`
	max-width: 100%;
	width: calc(100% - 30px - 16px);
	display: flex;
	margin: 8px 0 0 0;

	button:first-of-type {
		margin: 0 8px;
	}
`;
const StyledAddNewIconButton = styled.button(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 30px;
	border-radius: 5px;
	filter: grayscale(100%);
	border: none;
	background: ${colors.chip.defaultBg};
	transition: 0.15s ease all;

	&:hover {
		cursor: pointer;

		img {
			transform: scale(1.2);
		}
	}
`
);
const StyledErrorIconButton = styled.button(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 30px;
	border-radius: 5px;
	filter: grayscale(100%);
	border: none;
	transition: 0.15s ease all;
	background: ${colors.error.bg};

	&:hover {
		cursor: pointer;

		img {
			transform: scale(1.2);
		}
	}
`
);
const StyledIcon = styled.img`
	width: 16px;
	height: 16px;
	transition: 0.15s ease all;
`;
