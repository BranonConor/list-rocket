import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProfileCard = (props) => {
	return (
		<StyledWrapper
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{ ease: 'easeIn', duration: '0.25', type: 'spring' }}>
			<StyledImage src={props.photo} alt='Logged in user' />
			<h3>
				{props.firstName} {props.lastName}
			</h3>
			<StyledList>
				<li>Email: {props.email}</li>
			</StyledList>
		</StyledWrapper>
	);
};

export default ProfileCard;

const StyledWrapper = styled(motion.div)`
	max-width: 350px;
	border-radius: 10px;
	box-sizing: border-box;
	text-align: left;
`;

const StyledImage = styled.img`
	border-radius: 100%;
	width: 100px;
	height: 100px;
`;

const StyledList = styled.ul`
	padding: 0 0 0 20px;
	margin: 0;
`;
