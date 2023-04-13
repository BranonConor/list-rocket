import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Text } from '../typography/Text';
import { Title } from '../typography/Title';
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

interface Props {
	name: string;
	description: string;
	link: string;
	animationFactor: number;
	id: string;
	listId: string;
}

export const ListItem: React.FC<Props> = (props) => {
	const { name, description, link, animationFactor, id, listId } = props;
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);

	const handleDelete = async (e) => {
		e?.preventDefault();
		try {
			const res = await axios.delete(`/api/lists/${id}`, {
				data: {
					listId: listId,
					listItemId: id,
				},
			});
			prepWorkspace(currentEvent._id);
			toast.success('Successfully deleted your item 🗑', {
				toastId: 'delete-list-item-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'error-delete-list-item-toast',
			});
		}
	};

	const handleEdit = () => {
		alert('editing coming soon!');
	};

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
			<StyledTitle variant='heading4'>{name}</StyledTitle>
			<Text variant='body2'>{description}</Text>
			<a href={link} target='_blank' rel='noopenner noreferrer'>
				See item
			</a>
			<StyledButtonContainer>
				<StyledDeleteButton onClick={handleDelete}>
					<img src='/icons/trash-red.svg' alt='Trash Icon' />
				</StyledDeleteButton>
				<StyledEditButton onClick={handleEdit}>
					<img src='/icons/pencil.svg' alt='Edit Icon' />
				</StyledEditButton>
			</StyledButtonContainer>
		</StyledCard>
	);
};

const StyledCard = styled(motion.div)(
	({ theme: { colors, shadows } }) => `
	position: relative;
    padding: 16px;
    border-radius: 5px;
    margin: 0 0 16px 0;
	transition: 0.10s ease all;
	background: ${colors.white};
	width: 100%;
	box-sizing: border-box;

	&:hover {
		box-shadow: ${shadows.standard};
		transform: translateY(-2px);

		img {
			filter: grayscale(0%);
		}
	}

	& a {
		color: ${colors.link.default};
		&:hover {
			color: ${colors.link.hover};
		}
	}
	`
);
const StyledTitle = styled(Title)`
	width: 75%;
`;
const StyledButtonContainer = styled.div`
	position: absolute;
	top: 12px;
	right: 10px;
	z-index: 2;
	box-sizing: border-box;
	transition: 0.1s ease all;

	img {
		filter: grayscale(100%);
		width: 18px;
		height: 18px;
	}
`;
const StyledDeleteButton = styled.button`
	background: none;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 8px;
	outline: none;
	border: none;
	transition: 0.1s ease all;
	height: 40px;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		transform: scale(1.15);
	}
`;
const StyledEditButton = styled.button`
	background: none;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 8px;
	outline: none;
	border: none;
	transition: 0.1s ease all;
	height: 40px;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		transform: scale(1.15);
	}
`;
