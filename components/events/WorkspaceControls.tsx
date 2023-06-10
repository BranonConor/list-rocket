import { ProfilePhoto } from '../ProfilePhoto';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { ChipButton } from '../buttons/ChipButton';
import { EventControls } from './EventControls';
import { UserCard } from '../cards/UserCard';

export const WorkspaceControls = () => {
	const { events } = useContext(EventContext);
	const { currentEvent, prepWorkspace, clearWorkspace } =
		useContext(WorkspaceContext);

	const handleChipButtonClick = async (e, eventId) => {
		e?.preventDefault();
		prepWorkspace(eventId);
	};
	const handleExitClick = async (e) => {
		e?.preventDefault();
		clearWorkspace();
	};

	return (
		<StyledWrapper>
			{currentEvent ? (
				<StyledEventWrapper>
					<StyledEventContent>
						<StyledInfoWrapper
							initial={{
								top: -20,
								opacity: 0,
							}}
							animate={{
								top: 0,
								opacity: 1,
							}}
							transition={{
								duration: 0.25,
								type: 'spring',
							}}>
							<StyledSpan>
								<Title variant='heading2'>
									{currentEvent?.name}
								</Title>
							</StyledSpan>
							<StyledDescription variant='body1'>
								{currentEvent?.description}
							</StyledDescription>
							<UserCard
								text='Event Creator'
								image={currentEvent?.creator?.image}
							/>
						</StyledInfoWrapper>
						<StyledButtonContainer>
							<StyledIconButton onClick={handleExitClick}>
								<img src='/icons/x.svg' />
							</StyledIconButton>
							<StyledIconButton onClick={() => alert('click!')}>
								<img src='/icons/pencil.svg' alt='Edit Icon' />
							</StyledIconButton>
							<StyledIconButton onClick={() => alert('click!')}>
								<img
									src='/icons/trash-red.svg'
									alt='Trash Icon'
								/>
							</StyledIconButton>
						</StyledButtonContainer>
					</StyledEventContent>
					<EventControls />
				</StyledEventWrapper>
			) : (
				<StyledYourEventsWrapper>
					<Title variant='heading2'>Your Events</Title>
					<Text variant='body1'>
						Choose an event to load it into your workspace
					</Text>
					<StyledEventsWrapper>
						{events?.map((event, index: number) => {
							return (
								<StyledChipWrapper
									key={event._id}
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
										duration: 0.125 * (index + 0.5),
										type: 'spring',
									}}>
									<ChipButton
										onClick={(e) =>
											handleChipButtonClick(e, event._id)
										}
										content={event.name}
										isActive={
											currentEvent
												? currentEvent._id === event._id
												: null
										}
									/>
								</StyledChipWrapper>
							);
						})}
					</StyledEventsWrapper>
				</StyledYourEventsWrapper>
			)}
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	border-radius: 10px;
	box-sizing: border-box;
	margin: 16px 0;
	width: 100%;
	display: flex;

	@media only screen and (max-width: 768px) {
		width: 100%;
		flex-direction: column;
	}
`;
const StyledYourEventsWrapper = styled.div(
	({ theme: { colors } }) => `
	box-sizing: border-box;
	padding: 16px;
	margin: 0 0 16px 0;
	background: ${colors.bgLight};
	border-radius: 10px;
	width: 100%;
	transition: 0.25s ease all;
`
);
const StyledEventsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: auto;
`;
const StyledEventWrapper = styled.div`
	width: 100%;
	display: flex;
	height: auto;

	@media only screen and (max-width: 950px) {
		flex-direction: column;
	}
	@media only screen and (max-width: 768px) {
		width: 100%;
	}
`;
const StyledInfoWrapper = styled(motion.div)(
	({ theme: { colors } }) => `
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
	box-sizing: border-box;
	background: ${colors.bgLight};
	border-right: 1px solid rgba(0,0,0, 0.1);


	@media only screen and (max-width: 1330px) {
		min-width: 60%;
	}
	@media only screen and (max-width: 1025px) {
		min-width: 50%;
	}
	@media only screen and (max-width: 950px) {
		margin: 0 0 16px 0;
	}
`
);
const StyledDescription = styled(Text)`
	margin: 0 0 16px 0;
`;
const StyledSpan = styled.span`
	display: flex;
	align-items: center;
	width: 100%;
	position: relative;
`;
const StyledChipWrapper = styled(motion.div)`
	margin: 8px 8px 16px 0;
	min-height: 20px;
`;
const StyledIconButton = styled.button`
	background: none;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 0;
	outline: none;
	border: none;
	transition: 0.1s ease all;
	height: 34px;
	width: 18px;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		transform: scale(1.25);
	}
	img {
		filter: grayscale(100%);
		width: 14px;
		height: 14px;
	}
`;
const StyledButtonContainer = styled.div`
	box-sizing: border-box;
	transition: 0.1s ease all;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding-left: 16px;
`;
const StyledEventContent = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	min-width: 70%;
	position: relative;
	border-radius: 10px;
	box-sizing: border-box;
	margin: 0 16px 0 0;
	padding: 16px;
	background: ${colors.bgLight};

	&:hover {
		img {
			filter: grayscale(0%);
		}
	}

	@media only screen and (max-width: 1330px) {
		min-width: 60%;
	}
	@media only screen and (max-width: 1025px) {
		min-width: 50%;
	}
	@media only screen and (max-width: 950px) {
		margin: 0 0 16px 0;
	}
`
);
