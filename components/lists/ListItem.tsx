import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Text } from '../typography/Text';
import { Title } from '../typography/Title';

interface Props {
	name: string;
	description: string;
	link: string;
	animationFactor: number;
}

export const ListItem: React.FC<Props> = (props) => {
	const { name, description, link, animationFactor } = props;

	return (
		<StyledCard
			initial={{
				top: -20,
				opacity: 0,
			}}
			animate={{
				top: 0,
				opacity: 1,
			}}
			transition={{
				delay: 0.1 + 0.05 * animationFactor,
				duration: 0.5,
				type: 'spring',
			}}>
			<Title variant='heading4'>{name}</Title>
			<Text variant='body2'>{description}</Text>
			<a href={link} target='_blank' rel='noopenner noreferrer'>
				See item
			</a>
		</StyledCard>
	);
};

const StyledCard = styled(motion.div)(
	({ theme: { colors, shadows } }) => `
    padding: 16px;
    border-radius: 5px;
    margin: 0 0 16px 0;
	transition: 0.10s ease all;
	background: ${colors.white};

	&:hover {
		box-shadow: ${shadows.standard};
		transform: translateY(-2px);
	}

	& a {
		color: ${colors.link.default};
		&:hover {
			color: ${colors.link.hover};
		}
	}
	`
);
