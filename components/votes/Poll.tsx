import styled from 'styled-components';
import { Title } from '../typography/Title';
import { ProfilePhoto } from '../ProfilePhoto';
import { Text } from '../typography/Text';
import { Option } from './Option';
import { IUser } from '../../contexts/types';
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { UserContext } from '../../contexts/UserContext';
import { getVoteMap } from '../../helpers/getVoteMap';
import axios from 'axios';
import { useDeletePollMutation } from '../../hooks/mutations/polls/useDeletePollMutation';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { toast } from 'react-toastify';
import { Dialog } from '../Dialog';
import { useClosePollMutation } from '../../hooks/mutations/polls/useClosePollMutation';

interface IPollProps {
	id: string;
	title: string;
	creator: IUser;
	isOpen?: boolean;
	options: string[];
	userSelection?: string;
	votes?: { user: IUser; option: string }[];
}

export const Poll: React.FC<IPollProps> = ({
	id,
	title,
	creator,
	isOpen = false,
	options,
	userSelection = null,
	votes,
}) => {
	const { user } = useContext(UserContext);
	const { currentEvent } = useContext(WorkspaceContext);
	const { mutate: deletePoll } = useDeletePollMutation();
	const { mutate: closePoll } = useClosePollMutation();
	const [currentValue, setCurrentValue] = useState<null | string>(
		userSelection
	);
	const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
	const [closePollDialogIsOpen, setClosePollDialogIsOpen] = useState(false);

	const voteMap = getVoteMap(votes);
	const getOptions = (options, voteMap) => {
		let totalVotes = 0;
		options.forEach((option) => {
			totalVotes += voteMap[option]?.length || 0;
		});
		let mostVotes = 0;
		const reformattedOptions = options.map((option) => {
			const freq = voteMap[option]?.length || 0;
			mostVotes = Math.max(freq, mostVotes);
			const percentage = Math.ceil((freq / totalVotes) * 100);
			return {
				name: option,
				percentage: percentage ? percentage : 0,
				isMostVotedOption: mostVotes === freq && freq !== 0,
			};
		});
		return reformattedOptions;
	};
	const formattedOptions = getOptions(options, voteMap);

	const handleDeletePoll = async (e) => {
		e.preventDefault();
		try {
			deletePoll({
				pollId: id,
				eventId: currentEvent?._id,
			});

			await axios.post('/api/pusher', {
				eventId: currentEvent?._id,
				user: user,
				action: 'event-update',
			});
			setDeleteDialogIsOpen(false);
			toast.success('Deleted poll 🗑️', {
				toastId: 'delete-poll-success-toast',
			});
		} catch (error) {
			console.log(error);
			toast.success('Something went wrong 😵‍💫', {
				toastId: 'delete-poll-error-toast',
			});
		}
	};

	const handleClosePoll = async (e) => {
		e.preventDefault();
		try {
			closePoll({
				pollId: id,
			});

			await axios.post('/api/pusher', {
				eventId: currentEvent?._id,
				user: user,
				action: 'event-update',
			});
			setClosePollDialogIsOpen(false);
			toast.success('Closed poll ✅', {
				toastId: 'close-poll-success-toast',
			});
		} catch (error) {
			console.log(error);
			toast.success('Something went wrong 😵‍💫', {
				toastId: 'close-poll-error-toast',
			});
		}
	};

	return (
		<StyledWrapper>
			<StyledFormWrapper
				initial={{
					opacity: 0.5,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 0.5,
					type: 'spring',
				}}>
				<legend>
					<Title variant='heading3'>{title}</Title>
				</legend>
				<StyledDetailsWrapper>
					<StyledCreatorLabel>
						<ProfilePhoto
							photo={creator.image}
							dimensions='24px'
							hasBoxShadow
						/>
						<StyledText variant='body2'>{creator.name}</StyledText>
					</StyledCreatorLabel>
					<StyledStatusChip isOpen={isOpen}>
						<Text variant='overline'>
							{isOpen ? 'OPEN' : 'CLOSED'}
						</Text>
					</StyledStatusChip>
				</StyledDetailsWrapper>
				<StyledOptionsGrid>
					{formattedOptions.map((option) => {
						let isUserSelection = false;
						voteMap[option.name]?.forEach((voter) => {
							if (voter._id === user?._id) {
								isUserSelection = true;
							}
						});

						return (
							<React.Fragment key={option.name}>
								<Option
									pollId={id}
									name={option.name}
									percentage={option.percentage}
									isMostVotedOption={option.isMostVotedOption}
									isOpen={isOpen}
									currentValue={currentValue}
									setCurrentValue={setCurrentValue}
									isUserSelection={isUserSelection}
								/>
							</React.Fragment>
						);
					})}
				</StyledOptionsGrid>
				<StyledListButtonsWrapper>
					<StyledAddNewIconButton
						id='close-poll-button'
						onClick={(e: any) => {
							e.preventDefault();
							if (isOpen) {
								setClosePollDialogIsOpen(true);
							} else {
								toast.warning(
									'This poll is already closed ☑️',
									{
										toastId: 'close-poll-warning-toast',
									}
								);
							}
						}}
						isClosed={!isOpen}>
						<StyledIcon src='/icons/check-circle-dark.svg' />
					</StyledAddNewIconButton>
					<StyledErrorIconButton
						id='delete-poll-button'
						onClick={(e: any) => {
							e.preventDefault();
							setDeleteDialogIsOpen(true);
						}}>
						<StyledIcon src='/icons/trash-red.svg' />
					</StyledErrorIconButton>
				</StyledListButtonsWrapper>

				{deleteDialogIsOpen && (
					<Dialog
						title='Delete Poll'
						description={`Are you sure you want to delete the poll: ${title}? All data for this poll will be permanently lost.`}
						cta={handleDeletePoll}
						buttonText='Delete'
						setDialogIsOpen={setDeleteDialogIsOpen}
						showCancelButton
					/>
				)}
				{closePollDialogIsOpen && (
					<Dialog
						title='Close Poll'
						description={`Are you sure you want to close the poll: ${title}? Collaborators will no longer be able to cast votes on this poll.`}
						cta={handleClosePoll}
						buttonText='Close Poll'
						setDialogIsOpen={setClosePollDialogIsOpen}
						showCancelButton
					/>
				)}
			</StyledFormWrapper>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div``;
const StyledFormWrapper = styled(motion.form)(
	({ theme: { colors } }) => `
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
    background: ${colors.bgLight};
    border-radius: 10px;
    padding: 16px;
    box-sizing: border-box;
	height: auto;

	&:hover {
		#close-poll-button {
			filter: grayscale(0);
		}
		#delete-poll-button {
			filter: grayscale(0);
		}
	}
`
);
const StyledCreatorLabel = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StyledText = styled(Text)`
	margin-left: 8px;
`;
const StyledOptionsGrid = styled.fieldset`
	border: none;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 16px;
	width: 100%;
	box-sizing: border-box;
	margin: 16px 0;
`;
interface IStyledStatusChipProps {
	isOpen: boolean;
}
const StyledStatusChip = styled.div<IStyledStatusChipProps>(
	({ isOpen, theme: { colors } }) => `
    height: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    background: ${isOpen ? colors.tertiaryGradient : colors.bgDark};
    color: white;
    border-radius: 8px;
`
);
const StyledDetailsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;
const StyledListButtonsWrapper = styled.div`
	width: 100%;
	display: flex;
	height: 30px;
	max-height: 30px;
	transition: 0.25s ease all;
	overflow: hidden;
	margin-top: 12px;

	button:first-of-type {
		margin: 0 8px 0 0;
	}
`;
interface IStyledAddNewIconButtonProps {
	isClosed: boolean;
}
const StyledAddNewIconButton = styled.button<IStyledAddNewIconButtonProps>(
	({ isClosed, theme: { colors } }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 30px;
	border-radius: 5px;
	filter: grayscale(100%);
	border: none;
	background: ${colors.chip.defaultBg};
	transition: 0.15s ease all;
	cursor: ${isClosed ? 'not-allowed' : 'pointer'};

	&:hover {
		img {
			transform:  ${isClosed ? 'scale(1)' : 'scale(1.2)'};
		}
	}
`
);
const StyledErrorIconButton = styled.button(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 30px;
	border-radius: 5px;
	filter: grayscale(100%);
	border: none;
	transition: 0.15s ease all;
	background: ${colors.error.bg};

	&:hover {
		cursor: pointer;

		img {
			transform: scale(1.2);
		}
	}
`
);
const StyledIcon = styled.img`
	width: 16px;
	height: 16px;
	transition: 0.15s ease all;
`;
