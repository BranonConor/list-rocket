import { ProfilePhoto } from '../ProfilePhoto';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Title } from '../typography/Title';
import { IListItem, IUser } from '../../contexts/types';
import { ListItem } from './ListItem';
import { AddListItemForm } from './AddListItemForm';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text } from '../typography/Text';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { EditListItemForm } from './EditListItemForm';

interface Props {
	creator: IUser;
	items: IListItem[];
	id: string;
}

export const UserList: React.FC<Props> = (props) => {
	const { creator, items, id } = props;
	const { user } = useContext(UserContext);
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const isCurrentUser = creator.email === user.email;

	//handling edits
	const [currentItemBeingEdited, setCurrentItemBeingEdited] = useState<
		string | null
	>(null);

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
				duration: 0.5,
				type: 'spring',
			}}>
			<StyledList>
				<StyledListTitle>
					<ProfilePhoto photo={creator.image} dimensions='40px' />
					<StyledTitle variant='heading3'>
						{isCurrentUser ? (
							<>
								Your List
								{currentEvent?.controls?.anonymousModeIsOn && (
									<motion.img
										src='/icons/hidden.svg'
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
							</>
						) : (
							`${creator.name.split(' ')[0]}'s List`
						)}
					</StyledTitle>
				</StyledListTitle>
				<StyledContent>
					<>
						{items?.length ? (
							items?.map((item, index) =>
								item._id === currentItemBeingEdited ? (
									<StyledListItem key={item._id}>
										<EditListItemForm
											listItemId={item._id}
											setCurrentItemBeingEdited={
												setCurrentItemBeingEdited
											}
											name={item.name}
											description={item.description}
											link={item.link}
										/>
									</StyledListItem>
								) : (
									<StyledListItem key={item._id}>
										<ListItem
											name={item.name}
											description={item.description}
											link={item.link}
											resolvedBy={item.resolvedBy}
											animationFactor={index}
											listId={id}
											id={item._id}
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
				<AddListItemForm listId={id} />
			</StyledList>
		</StyledListWrapper>
	);
};

const StyledListWrapper = styled(motion.div)`
	height: auto;
	max-height: 100%;
	width: 300px;
	min-width: 300px;
	margin-right: 16px;
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
const StyledListTitle = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: flex-start;
	color: ${colors.textLight};

	img {
		margin: 0 16px 0 0;
	}
`
);
const StyledContent = styled.ul`
	box-sizing: border-box;
	width: 100%;
	list-style: none;
	padding: 0;
	margin: 8px 0 16px 0;
	max-height: 632px;
	border-radius: 5px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}
`;
const StyledListItem = styled.li`
	width: 100%;
	box-sizing: border-box;
	margin: 0 0 16px 0;

	&:last-of-type {
		margin: 0 0 0 0;
	}
`;
const StyledText = styled(Text)`
	margin: 0 0 16px 0;
`;
const StyledTitle = styled(Title)`
	display: flex;
	align-items: center;
	position: relative;

	img {
		margin: 0 16px;
		position: relative;
		top: -2px;
	}
`;
