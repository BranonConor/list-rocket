import { ProfilePhoto } from '../ProfilePhoto';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Title } from '../typography/Title';
import { IListItem, IUser } from '../../contexts/types';
import { ListItem } from './ListItem';
import { AddListItemForm } from './AddListItemForm';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

interface Props {
	creator: IUser;
	items: IListItem[];
}

export const UserList: React.FC<Props> = (props) => {
	const { creator, items } = props;
	const { user } = useContext(UserContext);

	return (
		<StyledList
			initial={{
				top: -20,
				opacity: 0,
			}}
			animate={{
				top: 0,
				opacity: 1,
			}}
			transition={{
				delay: 0.15,
				duration: 0.5,
				type: 'spring',
			}}>
			<StyledTitle>
				<ProfilePhoto photo={creator.image} dimensions='40px' />
				<Title variant='heading3'>
					{creator.name === user.name
						? 'Your List'
						: `${creator.name}'s List`}
				</Title>
			</StyledTitle>
			<StyledContent>
				<>
					{items?.length
						? items?.map((item, index) => (
								<li key={item.name}>
									<ListItem
										name={item.name}
										description={item.description}
										link={item.link}
										animationFactor={index}
									/>
								</li>
						  ))
						: 'Add your first items! ✍🏽'}
				</>
			</StyledContent>
			<AddListItemForm />
		</StyledList>
	);
};

const StyledList = styled(motion.div)(
	({ theme: { colors } }) => `
	background: ${colors.bgLight};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 16px;
	box-sizing: border-box;
	border-radius: 5px;
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
	list-style: none;
	padding: 0;
`;
