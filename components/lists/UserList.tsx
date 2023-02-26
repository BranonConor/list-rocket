import { ProfilePhoto } from '../ProfilePhoto';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Title } from '../typography/Title';
import { IListItem } from '../../contexts/types';
import { Text } from '../typography/Text';

interface Props {
	photo: string;
	items: IListItem[];
}

export const UserList: React.FC<Props> = (props) => {
	const { photo, items } = props;
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
				<ProfilePhoto photo={photo} dimensions='40px' />
				<Title variant='heading3'>Your List</Title>
			</StyledTitle>
			<StyledContent>
				<></>
				{items?.length ? (
					<>
						{items.map((item) => {
							<li>{item.name}</li>;
						})}
					</>
				) : (
					<Text variant='body1'>Add your first items!</Text>
				)}
			</StyledContent>
		</StyledList>
	);
};

const StyledList = styled(motion.div)(
	({ theme: { shadows } }) => `
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 16px;
	box-sizing: border-box;
	border-radius: 5px;
	box-shadow: ${shadows.standard};
`
);
const StyledTitle = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: flex-start;

	& img {
		margin: 0 16px 0 0;
	}
`;
const StyledContent = styled.ul`
	list-style: none;
	padding: 0;
`;
