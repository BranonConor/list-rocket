import { Dispatch, SetStateAction, useContext, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { PrimaryButton } from '../buttons/PrimaryButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { UserContext } from '../../contexts/UserContext';
import { EventContext } from '../../contexts/EventContext';

interface IProps {
	setUserIsCreatingEvent: Dispatch<SetStateAction<boolean>>;
}

export const CreateEventForm: React.FC<IProps> = (props) => {
	const { setUserIsCreatingEvent } = props;
	const { getAllEvents } = useContext(EventContext);
	const { user } = useContext(UserContext);
	const [nameValue, setNameValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			if (nameValue === '' || descriptionValue === '') {
				throw new Error();
			}
			await axios.post(`/api/events`, {
				event: {
					name: nameValue,
					description: descriptionValue,
					controls: {
						listHeight: 'Large', // default to Large
					},
				},
				user: user,
			});

			setNameValue('');
			setDescriptionValue('');
			setUserIsCreatingEvent(false);
			getAllEvents();

			toast.success('Successfully created your event ✨', {
				toastId: 'created-event-toast',
			});
		} catch (error) {
			if (nameValue === '' || descriptionValue === '') {
				toast.error('Please enter a title and description. ✍🏾', {
					toastId: 'unauthenticated-route-toast',
				});
			} else {
				toast.error('Something went wrong, sorry! 😵‍💫', {
					toastId: 'error-creating-event-toast',
				});
			}
		}
	};

	const handleCancelClick = (event: any) => {
		event.preventDefault();
		setUserIsCreatingEvent(false);
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
				<StyledTextInput
					value={nameValue}
					placeholder='Add a name'
					name='name'
					required
					onChange={(e) => setNameValue(e.target.value)}
				/>
				<StyledTextArea
					value={descriptionValue}
					placeholder='Add a description'
					name='title'
					required
					onChange={(e) => setDescriptionValue(e.target.value)}
					rows={3}
				/>
				<StyledButtonWrapper>
					<PrimaryButton
						variant='small'
						content='Create!'
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
	({ theme: { colors, shadows } }) => `
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 10px;
	box-sizing: border-box;
	text-align: left;
	padding: 16px;
	background: ${colors.bgLight};
`
);
const StyledForm = styled.form`
	width: 100%;
`;
const StyledTextInput = styled.input(
	({ theme: { colors, typography } }) => `
	width: 100%;
	box-sizing: border-box;
	padding: 4px 8px 0 8px;
	margin: 4px 0;
	border: none;
    font-family: Lalezar;
    font-size: ${typography.size.heading3};
    color: ${colors.font.body};
	background: none;
`
);
const StyledTextArea = styled.textarea(
	({ theme: { colors, typography } }) => `
	width: 100%;
	box-sizing: border-box;
	padding: 8px;
	margin: 4px 0;
	border: none;
	font-family: ${typography.font.body1};
    color: ${colors.font.body};
	background: none;
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
