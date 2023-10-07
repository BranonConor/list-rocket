import { motion } from 'framer-motion';
import { ProfilePhoto } from '../ProfilePhoto';
import { Text } from '../typography/Text';
import styled from 'styled-components';

interface IProps {
	text: string;
	image: string;
}

export const UserCard: React.FC<IProps> = (props) => {
	const { text, image } = props;

	return (
		<StyledInfoCard>
			<StyledAvatar
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
				}}>
				<ProfilePhoto photo={image} dimensions='24px' />
			</StyledAvatar>
			<StyledP variant='overline'>{text}</StyledP>
		</StyledInfoCard>
	);
};

const StyledAvatar = styled(motion.a)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: auto;
`;
const StyledP = styled(Text)`
	padding: 0 0 0 8px;
`;
const StyledInfoCard = styled.div(
	({ theme: { colors, shadows } }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	width: 158px;
	background: ${colors.white};
	border-radius: 5px;
	height: 50px;
    box-shadow: ${shadows.standard};

	@media only screen and (max-width: 768px) {
		display: none;
	}
`
);
