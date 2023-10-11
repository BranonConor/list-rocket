import { ProfilePhoto } from '../ProfilePhoto';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Title } from '../typography/Title';
import { IListItem, IUser } from '../../contexts/types';
import { ListItem } from './ListItem';
import { ListButtons } from './ListButtons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text } from '../typography/Text';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { EditListItemForm } from './EditListItemForm';
import { ListUserSelector } from './ListUserSelection';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Dialog } from '../Dialog';

interface Props {
	creator: IUser;
	items: IListItem[];
	id: string; // the ID of the list
	customCreator?: string;
}

export const UserList: React.FC<Props> = (props) => {
	const { creator, items, id, customCreator } = props;
	const { user } = useContext(UserContext);
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const isCurrentUser = creator?.email === user?.email;
	const [isUserSelectorOpen, setIsUserSelectorOpen] = useState(false);
	const [isCustomUserInputOn, setIsCustomUserInputOn] = useState(false);
	const [customNameInputValue, setCustomNameInputValue] = useState('');
	const [deleteListDialogIsOpen, setDeleteListDialogIsOpen] = useState(false);
	const [isListCollapsed, setIsListCollapsed] = useState(false);

	//handling edits
	const [currentItemBeingEdited, setCurrentItemBeingEdited] = useState<
		string | null
	>(null);

	let creatorName = isCurrentUser
		? 'Your'
		: creator
		? `${creator?.name.split(' ')[0]}'s`
		: 'Unassigned';

	if (customCreator) {
		creatorName = `${customCreator}'s`;
	}

	const handleSubmit = async (event: any) => {
		try {
			event.preventDefault();
			if (customNameInputValue === '') {
				throw new Error();
			}
			await axios.put(`/api/lists/${id}`, {
				name: customNameInputValue,
				listId: id,
				action: 'add-custom-list-creator',
			});

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
				user: user,
				action: 'event-update',
			});

			//reset the custom name input value and hide it
			setIsCustomUserInputOn(false);
			setCustomNameInputValue('');

			toast.success(`Assigned list 👍🏽`, {
				toastId: 'assigned-list-to-user-toast',
			});
		} catch (axiosError) {
			if (customNameInputValue === '') {
				toast.error(`Please fill out all list item fields. 👀`, {
					toastId: 'list-item-value-not-found-toast',
				});
			} else {
				toast.error('Something went wrong, sorry! 😵‍💫', {
					toastId: 'assigned-list-to-user-error-toast',
				});
			}
		}
	};

	const handleDeleteList = async () => {
		try {
			//ping list API to delete the list and its items
			await axios.delete(`/api/lists/${id}`, {
				data: {
					listId: id,
					action: 'delete-list',
				},
			});
			//ping the events API to update it by removing this list from its lists
			await axios.put(`/api/events/${currentEvent._id}`, {
				listId: id,
				eventId: currentEvent._id,
				action: 'delete-list',
			});

			setDeleteListDialogIsOpen(false);

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
				user: user,
				action: 'event-update',
			});

			toast.success(`Deleted List 🗑️`, {
				toastId: 'delete-list-toast',
			});

			prepWorkspace(currentEvent._id);
		} catch (error) {
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'delete-list-error-toast',
			});
		}
	};

	const handleListClick = () => {
		setIsListCollapsed(!isListCollapsed);
	};

	//when prepWorkspace is called, reset the edits
	useEffect(() => {
		setCurrentItemBeingEdited(null);
	}, [prepWorkspace]);

	return (
		<StyledListWrapper
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
				duration: 0.25,
				type: 'spring',
			}}>
			<StyledList>
				<StyledListTitle isListCollapsed={isListCollapsed}>
					{isCustomUserInputOn ? (
						<StyledCloseButton
							onClick={() => setIsCustomUserInputOn(false)}
							initial={{
								top: -20,
								opacity: 0,
							}}
							animate={{
								top: 0,
								opacity: 1,
							}}
							transition={{
								delay: 0,
								duration: 0.15,
								type: 'spring',
							}}>
							<img src='/icons/x.svg' />
						</StyledCloseButton>
					) : (
						<StyledButton
							onClick={() =>
								setIsUserSelectorOpen(!isUserSelectorOpen)
							}
							initial={{
								scale: 0,
								opacity: 0,
							}}
							animate={{
								scale: 1,
								opacity: 1,
							}}
							transition={{
								duration: 0.05,
								type: 'spring',
							}}>
							<ProfilePhoto
								photo={creator?.image || '/assets/user.svg'}
								dimensions='24px'
								hasBoxShadow
							/>
						</StyledButton>
					)}
					{isUserSelectorOpen && (
						<ListUserSelector
							users={currentEvent.collaborators}
							listId={id}
							setIsUserSelectorOpen={setIsUserSelectorOpen}
							setIsCustomUserInputOn={setIsCustomUserInputOn}
						/>
					)}
					<>
						{isCustomUserInputOn ? (
							<StyledForm onSubmit={handleSubmit}>
								<StyledInput
									placeholder='Add a name'
									type='text'
									required
									value={customNameInputValue}
									onChange={(e) =>
										setCustomNameInputValue(e.target.value)
									}
									name='name'
									initial={{
										top: -20,
										opacity: 0,
									}}
									animate={{
										top: 0,
										opacity: 1,
									}}
									transition={{
										duration: 0.25,
										type: 'spring',
									}}></StyledInput>
								<StyledSubmitButton
									type='submit'
									initial={{
										top: -20,
										opacity: 0,
									}}
									animate={{
										top: 0,
										opacity: 1,
									}}
									transition={{
										duration: 0.35,
										type: 'spring',
									}}>
									<img src='/icons/send.svg' />
								</StyledSubmitButton>
							</StyledForm>
						) : (
							<StyledTitle
								variant='heading5'
								onClick={handleListClick}>
								{creatorName} List
								{currentEvent?.controls?.anonymousModeIsOn &&
									isCurrentUser && (
										<motion.img
											src='/icons/eye-dark.svg'
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
												duration: 0.25,
												type: 'spring',
											}}
										/>
									)}
							</StyledTitle>
						)}
					</>
				</StyledListTitle>
				<StyledContent
					listHeight={currentEvent?.controls?.listHeight}
					isListCollapsed={isListCollapsed}>
					<>
						{items?.length ? (
							items?.map((item, index) =>
								item?._id === currentItemBeingEdited ? (
									<StyledListItem key={item?._id}>
										<EditListItemForm
											listItemId={item?._id}
											setCurrentItemBeingEdited={
												setCurrentItemBeingEdited
											}
											name={item?.name}
											description={item?.description}
											link={item?.link}
										/>
									</StyledListItem>
								) : (
									<StyledListItem key={item?._id}>
										<ListItem
											name={item?.name}
											description={item?.description}
											link={item?.link}
											resolvedBy={item?.resolvedBy}
											animationFactor={index}
											listId={id}
											id={item?._id}
											isCurrentUser={isCurrentUser}
											setCurrentItemBeingEdited={
												setCurrentItemBeingEdited
											}
										/>
									</StyledListItem>
								)
							)
						) : (
							<StyledText variant='body1'>
								Add your first items! ✍🏽
							</StyledText>
						)}
					</>
				</StyledContent>
				<ListButtons
					listId={id}
					setDeleteListDialogIsOpen={setDeleteListDialogIsOpen}
					isListCollapsed={isListCollapsed}
				/>
				{deleteListDialogIsOpen && (
					<Dialog
						title={'Delete List'}
						description={
							'Are you sure you want to delete this list? All the items in this list will be deleted as well, and cannot be recovered. '
						}
						buttonText={'Delete'}
						setDialogIsOpen={setDeleteListDialogIsOpen}
						showCancelButton
						cta={handleDeleteList}
					/>
				)}
			</StyledList>
		</StyledListWrapper>
	);
};

const StyledListWrapper = styled(motion.div)`
	width: 300px;
	min-width: 300px;
	margin: 0 0 16px 0;

	&:last-of-type {
		margin: 0 0 0 0;
	}

	&:hover {
		#delete-list-button,
		#add-new-item-button {
			filter: grayscale(0);
		}
	}

	@media only screen and (max-width: 800px) {
		width: 100%;
		max-width: calc(100vw - 32px);
	}
`;
const StyledList = styled(motion.div)(
	({ theme: { colors } }) => `
	background: ${colors.bgLight};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 16px;
	box-sizing: border-box;
	border-radius: 10px;
`
);
interface IStyledContentProps {
	listHeight?: string;
	isListCollapsed?: boolean;
}
const StyledListTitle = styled.div<IStyledContentProps>(
	({ isListCollapsed, theme: { colors } }) => `
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: flex-start;
	color: ${colors.font.body};
	margin-bottom: ${isListCollapsed ? '0' : '8px'};
	transition: 0.3s ease all;
	background: ${colors.bgLight};
`
);
enum LIST_HEIGHTS {
	'Small' = '332px',
	'Medium' = '532px',
	'Large' = '732px',
}
const StyledContent = styled.ul<IStyledContentProps>(
	({ listHeight, isListCollapsed }) => `
	box-sizing: border-box;
	width: 100%;
	list-style: none;
	padding: 0;
	margin: ${isListCollapsed ? '0px' : '8px 0 16px 0'};
	max-height: ${isListCollapsed ? '0px' : LIST_HEIGHTS[listHeight] || '10000px'};
	border-radius: 5px;
	overflow-y: auto;
	overflow-x: hidden;
	transition: ${LIST_HEIGHTS[listHeight] ? '0.4s' : '2s'} ease all;
	opacity: ${isListCollapsed ? '0' : '1'};

	&::-webkit-scrollbar {
		display: none;
	}
`
);
const StyledListItem = styled.li`
	width: 100%;
	box-sizing: border-box;
	margin: 0 0 16px 0;

	&:last-of-type {
		margin: 0 0 0 0;
	}
`;
const StyledText = styled(Text)``;
const StyledTitle = styled(Title)`
	display: flex;
	align-items: center;
	position: relative;
	margin: 0px;
	max-height: 40px;
	width: 100%;

	img {
		margin: 0 0 0 8px;
		position: relative;
		top: -2px;
		width: 20px;
		height: 20px;
	}
`;
const StyledButton = styled(motion.button)(
	({ theme: { colors } }) => `
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 100%;
	padding: 4px;
	box-sizing: border-box;
	margin: 0 8px 0 0;
	transition: 0.15s ease all;
	position: relative;
	transform: translateY(-2px);

	img {
		margin: 0;
		z-index: 1;
	}

	&::before {
		content: '';
		position: absolute;
		top: 2;
		left: 2;
		width: 32px;
		height: 32px;
		padding: 2px;
		background: ${colors.chip.defaultBg};
		opacity: 0;
		transform: scale(0);
		transition: 0.10s ease all;
		border-radius: 100%;
		z-index: 0;
	}

	&:hover {
		cursor: pointer;

		&::before {
			opacity: 1;
			transform: scale(1);
		}
	}
`
);
const StyledForm = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 0 8px 0;
`;

const StyledInput = styled(motion.input)(
	({ theme: { shadows, typography, colors } }) => `
	border: none;
	border-radius: 20px;
	padding: 8px;
	box-sizing: border-box;
	height: 30px;
	box-shadow: ${shadows.standard};

	font-size: ${typography.size.body2};
	font-weight: ${typography.weight.body2};
	font-family: 'Poppins';
	line-height: ${typography.lineHeight.body2};
	letter-spacing: ${typography.letterSpacing.body2};
	margin: 0 8px 0 0;
	position: relative;
	max-width: 150px;

	&:focus {
		outline: 4px solid ${colors.chip.defaultBg};
	}
	`
);

const StyledSubmitButton = styled(motion.button)(
	({ theme: { shadows } }) => `
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	background: white;
	border-radius: 100%;
	padding: 0;
	box-shadow: ${shadows.standard};
	position: relative;

	img {
		padding: 0;
		margin: 0 0;
		top: 0;
		width: 18px;
		height: 18px;
	}
	
	&:hover {
		cursor: pointer;
	}
`
);
const StyledCloseButton = styled(motion.button)(
	({ theme: { shadows } }) => `
	position: relative;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	margin: 0 8px 0 0;
	background: white;
	border-radius: 100%;
	padding: 0;
	box-shadow: ${shadows.standard};
	transform: translateY(-4px);

	img {
		padding: 0;
		margin: 0 0;
		top: 0;
		width: 18px;
		height: 18px;
	}

	&:hover {
		cursor: pointer;
	}
`
);
