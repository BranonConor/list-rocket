import axios from 'axios';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { useAddPollMutation } from '../../hooks/mutations/polls/useAddCustomNameMutation';
import { Dialog } from '../Dialog';

interface IAddBlockModalProps {
	setPollsModalIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const AddPollModal: React.FC<IAddBlockModalProps> = ({
	setPollsModalIsOpen,
}) => {
	const { user } = useContext(UserContext);
	const { currentEvent } = useContext(WorkspaceContext);
	const [titleValue, setTitleValue] = useState('');
	const [optionsValues, setOptionsValues] = useState<string[]>(['']);
	const { mutate: addPoll } = useAddPollMutation();
	const handleAddNewOption = (e) => {
		e.preventDefault();
		setOptionsValues([...optionsValues, '']);
	};

	const handleChange = (e, index: number) => {
		const values = [...optionsValues];
		values[index] = e.target.value;
		setOptionsValues(values);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const optionsMap = {};
			optionsValues.forEach((option) => {
				if (option === '') {
					throw new Error('empty fields');
				}
				if (optionsMap[option]) {
					optionsMap[option] += 1;
				} else {
					optionsMap[option] = 1;
				}
			});
			Object.keys(optionsMap).forEach((option) => {
				if (optionsMap[option] > 1) {
					throw new Error('duplicate options');
				}
			});
			const pollData = {
				creator: user,
				title: titleValue,
				options: optionsValues,
				event: currentEvent,
				isOpen: true,
			};

			addPoll(pollData);
			setTitleValue('');
			setOptionsValues(['']);
			setPollsModalIsOpen(false);

			await axios.post('/api/pusher', {
				eventId: currentEvent?._id,
				user: user,
				action: 'event-update',
			});

			toast.success('Poll created 🗳️', {
				toastId: 'error-empty-poll-option-toast',
			});
		} catch (error) {
			if (error.message === 'empty fields') {
				toast.error('Please make sure there are no empty fields.', {
					toastId: 'error-empty-poll-option-toast',
				});
			} else if (error.message === 'duplicate options') {
				toast.error(
					'Please make sure there are no duplicate options in the poll.',
					{
						toastId: 'error-empty-poll-option-toast',
					}
				);
			} else {
				toast.error('Please make sure there are no empty fields.', {
					toastId: 'error-delete-poll-option-toast',
				});
			}
		}
	};

	return (
		<Dialog
			maxWidth='30%'
			title='🗳️ Add a Poll'
			description={'Create a poll to gather votes on a topic'}
			buttonText='Submit'
			cta={(e: any) => handleSubmit(e)}
			showCancelButton
			setDialogIsOpen={setPollsModalIsOpen}>
			<StyledForm>
				<StyledTitleInput
					value={titleValue}
					placeholder='Add a title'
					name='title'
					required
					onChange={(e) => setTitleValue(e.target.value)}
				/>
				{optionsValues.map((option, index: number) => (
					<StyledInputWrapper key={index}>
						<StyledTextInput
							value={option}
							placeholder={
								option !== '' ? option : 'Add an option'
							}
							name={option}
							required
							onChange={(e) => {
								handleChange(e, index);
							}}
						/>
						{optionsValues.length > 1 && (
							<StyledClearButton
								aria-label='delete option'
								onClick={(e) => {
									e.preventDefault();
									const values = [...optionsValues];
									values.splice(index, 1);
									setOptionsValues(values);
								}}>
								<StyledClearIcon src='/icons/x.svg' />
							</StyledClearButton>
						)}
					</StyledInputWrapper>
				))}
				<StyledAddNewOptionButton onClick={handleAddNewOption}>
					<StyledIcon src='/icons/add-dark.svg' />
				</StyledAddNewOptionButton>
			</StyledForm>
		</Dialog>
	);
};
const StyledForm = styled.form(
	({ theme: { colors } }) => `
	width: 100%;
	color: ${colors.font.body2};
	padding: 16px;
    background: ${colors.bgLight};
    box-sizing: border-box;
    border-radius: 10px;
`
);
const StyledTitleInput = styled.input(
	({ theme: { colors, typography } }) => `
	width: 100%;
	box-sizing: border-box;
	padding: 4px 8px 0 8px;
	margin-bottom: 16px;
	border: none;
    border-radius: 8px;
    font-family: Lalezar;
    font-size: ${typography.size.heading3};
    color: ${colors.font.body};
	background: white;
`
);
const StyledTextInput = styled.input(
	({ theme: { colors, typography } }) => `
	width: 100%;
	box-sizing: border-box;
	padding: 8px 36px 8px 8px;
	margin-bottom: 16px;
	border: none;
    border-radius: 8px;
    font-family: Poppins;
    font-size: ${typography.size.body1};
    color: ${colors.font.body};
	background: white;
`
);

const StyledAddNewOptionButton = styled.button(
	({ theme: { colors, typography } }) => `
    width: 100%;
    box-sizing: border-box;
    padding: 4px 8px 0 8px;
    height: 30px;
    border: none;
    border-radius: 8px;
    font-family: Poppins;
    font-size: ${typography.size.body1};
    color: ${colors.font.body};
    background: ${colors.chip.defaultBg};
    cursor: pointer;

    &:hover {
        img {
            transform: scale(1.1);
        }
    }
    `
);
const StyledIcon = styled.img`
	width: 16px;
	height: 16px;
	transition: 0.15s ease all;
`;
const StyledInputWrapper = styled.div`
	position: relative;
`;
const StyledClearButton = styled.button`
	border: none;
	position: absolute;
	top: 0px;
	right: 8px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;
	cursor: pointer;

	&:hover {
		img {
			transform: scale(1.1);
		}
	}
`;
const StyledClearIcon = styled.img`
	width: 16px;
	height: 16px;
	transition: 0.15s ease all;
	filter: grayscale(1);
`;
