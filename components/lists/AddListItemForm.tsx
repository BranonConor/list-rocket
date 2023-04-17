import { useContext, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { PrimaryButton } from '../buttons/PrimaryButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { motion } from 'framer-motion';

interface IProps {
	listId: string;
}

export const AddListItemForm: React.FC<IProps> = (props) => {
	const { listId } = props;
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const [isAddItemClicked, setIsAddItemClicked] = useState<boolean>(false);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [link, setLink] = useState<string>('');

	const handleAddItemClick = () => {
		setIsAddItemClicked(true);
	};
	const handleCancelClick = () => {
		setIsAddItemClicked(false);
	};
	const handleSubmit = async (event: any) => {
		try {
			event.preventDefault();
			if (name === '' || description === '' || link === '') {
				throw new Error();
			}
			const res = await axios.put(`/api/lists`, {
				listItem: {
					name: name,
					description: description,
					link: link,
				},
				listId: listId,
			});
			prepWorkspace(currentEvent._id);
			toast.success(`Successfully added new list item! 👍🏽`, {
				toastId: 'added-list-item-toast',
			});
			setName('');
			setDescription('');
			setLink('');
			setIsAddItemClicked(false);
		} catch (axiosError) {
			if (name === '' || description === '' || link === '') {
				toast.error(`Please fill out all list item fields. 👀`, {
					toastId: 'list-item-value-not-found-toast',
				});
			} else {
				toast.error('Something went wrong, sorry! 😵‍💫', {
					toastId: 'error-creating-list-item-toast',
				});
			}
		}
	};

	return isAddItemClicked ? (
		<StyledWrapper
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
				duration: 0.125,
				type: 'spring',
			}}>
			<StyledForm onSubmit={handleSubmit}>
				<StyledInput
					value={name}
					placeholder='Add a title'
					name='title'
					required
					onChange={(e) => setName(e.target.value)}
				/>
				<StyledInput
					value={description}
					placeholder='Add a description'
					name='title'
					required
					onChange={(e) => setDescription(e.target.value)}
				/>
				<StyledInput
					value={link}
					placeholder='Add a link'
					name='link'
					required
					onChange={(e) => setLink(e.target.value)}
				/>
				<StyledButtonWrapper>
					<PrimaryButton
						variant='small'
						content='Submit'
						type='submit'
					/>
					<SecondaryButton
						variant='small'
						content='Cancel'
						onClick={handleCancelClick}
					/>
				</StyledButtonWrapper>
			</StyledForm>
		</StyledWrapper>
	) : (
		<SecondaryButton
			variant='fullSmall'
			content='Add item'
			onClick={handleAddItemClick}
		/>
	);
};
const StyledWrapper = styled(motion.div)(
	({ theme: { shadows } }) => `
	width: 100%;
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: 5px;
	padding: 16px 8px;
	box-sizing: border-box;
    box-shadow: ${shadows.standard};
`
);
const StyledForm = styled.form`
	width: 100%;
`;
const StyledInput = styled.input(
	({ theme: { colors, typography } }) => `
	width: 100%;
	box-sizing: border-box;
	padding: 8px;
	margin: 4px 0;
	border: none;
	font-family: Poppins;
    color: ${colors.font.body};

	&:first-of-type {
		font-family: Lalezar;
        font-size: ${typography.size.heading4};
        padding: 4px 8px;
	}
`
);
const StyledButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	margin: 8px 0 0 0;
	padding: 0 8px;

	button:first-of-type {
		margin-right: 8px;
	}
`;
