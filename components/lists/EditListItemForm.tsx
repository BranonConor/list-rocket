import { Dispatch, SetStateAction, useContext, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { PrimaryButton } from '../buttons/PrimaryButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { motion } from 'framer-motion';
import { UserContext } from '../../contexts/UserContext';

interface IProps {
	listItemId: string;
	name: string;
	description: string;
	link: string;
	setCurrentItemBeingEdited: Dispatch<SetStateAction<string>>;
}

export const EditListItemForm: React.FC<IProps> = (props) => {
	const { listItemId, name, description, link, setCurrentItemBeingEdited } =
		props;
	const { currentEvent } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);

	const [nameValue, setNameValue] = useState(name);
	const [descriptionValue, setDescriptionValue] = useState(description);
	const [linkValue, setLinkValue] = useState(link);

	const handleCancelClick = (event: any) => {
		event.preventDefault();
		setCurrentItemBeingEdited(null);
	};

	const handleSubmit = async (event: any) => {
		//prevent unnecessary API calls
		if (
			nameValue === name &&
			descriptionValue === description &&
			linkValue === link
		) {
			setCurrentItemBeingEdited(null);
			return;
		}

		try {
			event.preventDefault();
			if (name === '' || description === '') {
				throw new Error();
			}
			await axios.put(`/api/list-items`, {
				data: {
					name: nameValue,
					description: descriptionValue,
					link: linkValue,
				},
				listItemId: listItemId,
			});

			//ping Pusher channel, this will trigger a rerender in the UserList
			await axios.post('/api/pusher', {
				event: currentEvent,
				user: user,
				action: 'event-update',
			});

			toast.success(`List item updated! 👍🏽`, {
				toastId: 'updated-list-item-toast',
			});
		} catch (axiosError) {
			if (name === '' || description === '') {
				toast.error(`Please fill out all list item fields. 👀`, {
					toastId: 'list-item-value-not-found-toast',
				});
			} else {
				toast.error('Something went wrong, sorry! 😵‍💫', {
					toastId: 'error-updating-list-item-toast',
				});
			}
		}
	};

	return (
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
					value={nameValue}
					placeholder={name}
					name='title'
					required
					onChange={(e) => setNameValue(e.target.value)}
				/>
				<StyledInput
					value={descriptionValue}
					placeholder={description}
					name='title'
					required
					onChange={(e) => setDescriptionValue(e.target.value)}
				/>
				<StyledInput
					value={linkValue}
					placeholder={link || 'Add a link'}
					name='link'
					onChange={(e) => setLinkValue(e.target.value)}
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
						type='button'
						onClick={handleCancelClick}
					/>
				</StyledButtonWrapper>
			</StyledForm>
		</StyledWrapper>
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
	margin: 0 0 16px 0;
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