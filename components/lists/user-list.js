import ProfilePhoto from '../profile-photo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Title } from '../typography/Title.tsx';

const UserList = (props) => {
	return (
		<StyledList
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{ ease: 'easeIn', duration: '0.25', type: 'spring' }}>
			<StyledTitle>
				<ProfilePhoto photo={props.photo} dimensions='40px' />
				<Title variant='heading3'>Your List</Title>
			</StyledTitle>
		</StyledList>
	);
};

export default UserList;

const StyledList = styled(motion.div)`
	width: 350px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 16px;
	box-sizing: border-box;
	border-radius: 5px;
	margin: 16px 16px 16px 0;
`;
const StyledTitle = styled.div`
	display: flex;
	align-items: center;
`;
