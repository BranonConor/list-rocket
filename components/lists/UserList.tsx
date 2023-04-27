import { ProfilePhoto } from '../ProfilePhoto';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Title } from '../typography/Title';
import { IListItem, IUser } from '../../contexts/types';
import { ListItem } from './ListItem';
import { AddListItemForm } from './AddListItemForm';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text } from '../typography/Text';

interface Props {
	creator: IUser;
	items: IListItem[];
	id: string;
}

export const UserList: React.FC<Props> = (props) => {
	const { creator, items, id } = props;
	const { user } = useContext(UserContext);

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
				<StyledTitle>
					<ProfilePhoto photo={creator.image} dimensions='40px' />
					<Title variant='heading3'>
						{creator.email === user.email
							? 'Your List'
							: `${creator.name.split(' ')[0]}'s List`}
					</Title>
				</StyledTitle>
				<StyledContent>
					<>
						{items?.length ? (
							items?.map((item, index) => (
								<StyledListItem key={item.name}>
									<ListItem
										name={item.name}
										description={item.description}
										link={item.link}
										resolvedBy={item.resolvedBy}
										animationFactor={index}
										listId={id}
										id={item._id}
									/>
								</StyledListItem>
							))
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
const StyledTitle = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: flex-start;
	color: ${colors.textLight};

	& img {
		margin: 0 16px 0 0;
	}
`
);
const StyledContent = styled.ul`
	box-sizing: border-box;
	width: 100%;
	list-style: none;
	padding: 0;
	margin: 8px 0 0 0;
`;
const StyledListItem = styled.li`
	width: 100%;
	box-sizing: border-box;
`;
const StyledText = styled(Text)`
	margin: 0 0 16px 0;
`;
