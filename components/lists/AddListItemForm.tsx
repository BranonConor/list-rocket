import { useContext, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { PrimaryButton } from '../buttons/PrimaryButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

export const AddListItemForm = () => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const [isAddItemClicked, setIsAddItemClicked] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
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
			if (title === '' || description === '' || link === '') {
				throw new Error();
			}

			const res = await axios.put(`/api/lists`, {
				listId: currentEvent._id,
			});

			prepWorkspace(currentEvent._id);
			toast.success(`Successfully added new list item! 👍🏽`, {
				toastId: 'added-list-item-toast',
			});
			setIsAddItemClicked(false);
		} catch (axiosError) {
			if (title === '' || description === '' || link === '') {
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
		<StyledWrapper>
			<StyledForm>
				<StyledInput
					value={title}
					placeholder='Add a title'
					name='title'
					required
					onChange={(e) => setTitle(e.target.value)}
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
			</StyledForm>
			<StyledButtonWrapper>
				<PrimaryButton
					variant='small'
					content='Submit'
					onClick={handleSubmit}
				/>
				<SecondaryButton
					variant='small'
					content='Cancel'
					onClick={handleCancelClick}
				/>
			</StyledButtonWrapper>
		</StyledWrapper>
	) : (
		<SecondaryButton
			variant='fullSmall'
			content='Add item'
			onClick={handleAddItemClick}
		/>
	);
};
const StyledWrapper = styled.div(
	({ theme: { shadows } }) => `
	width: 100%;
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: 8px;
	padding: 16px;
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

	button:first-of-type {
		margin-right: 8px;
	}
`;
