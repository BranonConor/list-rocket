import { Dispatch, SetStateAction } from 'react';
import { Dialog } from '../Dialog';
import styled from 'styled-components';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';

interface IAddBlockModalProps {
	setBlockModalIsOpen: Dispatch<SetStateAction<boolean>>;
	handleAddListBlock: () => void;
	setPollsModalIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const AddBlockModal: React.FC<IAddBlockModalProps> = ({
	setBlockModalIsOpen,
	handleAddListBlock,
	setPollsModalIsOpen,
}) => {
	const handleAddPollBlock = () => {
		setPollsModalIsOpen(true);
		setBlockModalIsOpen(false);
	};

	return (
		<Dialog
			maxWidth='50%'
			title='✨ Add Event Blocks'
			description={'Customize your event by adding the blocks you need!'}
			buttonText='Cancel'
			setDialogIsOpen={setBlockModalIsOpen}>
			<StyledBlockSelection>
				<StyledCard onClick={handleAddListBlock}>
					<StyledTitle variant='heading3'>
						<StyledIcon src='/icons/list.svg' />
						List
					</StyledTitle>
					<Text variant='body2'>
						Lists can be assigned a user and be filled with various
						types of nifty List Items
					</Text>
				</StyledCard>
				<StyledCard onClick={handleAddPollBlock}>
					<StyledTitle variant='heading3'>
						<StyledIcon src='/icons/poll.svg' />
						Poll
					</StyledTitle>
					<Text variant='body2'>
						Polls can be used to make decisions as a group by voting
					</Text>
				</StyledCard>
				<StyledComingSoonCard>
					<StyledTitle variant='heading3'>Chats</StyledTitle>
					<Text variant='body2'>Coming soon! 👀</Text>
				</StyledComingSoonCard>
				<StyledComingSoonCard>
					<StyledTitle variant='heading3'>Announcements</StyledTitle>
					<Text variant='body2'>Coming soon! 👀</Text>
				</StyledComingSoonCard>
			</StyledBlockSelection>
		</Dialog>
	);
};
const StyledBlockSelection = styled.div(
	({ theme: { colors } }) => `
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-gap: 16px;
	color: ${colors.font.body2};
	padding: 32px 0;
	
	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
		max-height: 300px;
		overflow: auto;
		padding: 8px 0;
	}
`
);
const StyledCard = styled.div(
	({ theme: { colors, shadows } }) => `
	width: 100%;
	background: ${colors.bgLight};
	color: ${colors.font.body};
	border-radius: 8px;
	padding: 16px;
	box-sizing: border-box;
	transition: 0.15s ease all;

	&:hover {
		box-shadow: ${shadows.standard};
		background: white;
		transform: translateY(-3px);
		cursor: pointer;
	}

	@media only screen and (max-width: 768px) {
		padding: 8px 16px;
	}
`
);
const StyledComingSoonCard = styled.div(
	({ theme: { colors } }) => `
	width: 100%;
	background: ${colors.bgLight};
	color: ${colors.font.body};
	border-radius: 8px;
	padding: 16px;
	box-sizing: border-box;
	transition: 0.15s ease all;
	opacity: 0.5;

	&:hover {
		cursor: not-allowed;
	}

	@media only screen and (max-width: 768px) {
		padding: 8px 16px;
	}
`
);
const StyledIcon = styled.img`
	margin: 0 8px 0 0;
`;
const StyledTitle = styled(Title)`
	display: flex;
	align-items: center;
`;
