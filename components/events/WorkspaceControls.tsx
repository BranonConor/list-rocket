import { ProfilePhoto } from '../ProfilePhoto';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { ChipButton } from '../buttons/ChipButton';

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
			{/* ---- EVENT CONTROLS ---- */}
			<StyledEventsContainer>
				<StyledYourEventsWrapper currentEvent={Boolean(currentEvent)}>
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
			</StyledEventsContainer>
			{/* ---- EVENT INFORMATION ---- */}
			<StyledEventInfoContainer>
				{currentEvent ? (
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
							<Title variant='heading3'>
								Currently working on: {currentEvent?.name}{' '}
							</Title>
							<StyledButton onClick={handleExitClick}>
								<StyledImg src='/icons/x.svg' />
							</StyledButton>
						</StyledSpan>
						<StyledDescription variant='body1'>
							{currentEvent?.description}
						</StyledDescription>
						<StyledInfoCard>
							<StyledP variant='body1'>Event Creator:</StyledP>
							<StyledAvatar
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
									duration: 0.25,
									type: 'spring',
								}}>
								<ProfilePhoto
									photo={currentEvent?.creator?.image}
									dimensions='35px'
								/>
							</StyledAvatar>
						</StyledInfoCard>
					</StyledInfoWrapper>
				) : (
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						transition={{
							duration: 1,
							type: 'spring',
						}}>
						<Text variant='body1'>No event loaded... 👻</Text>
					</motion.div>
				)}
			</StyledEventInfoContainer>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	width: 100%;
`;
interface StyledWrapperProps {
	currentEvent: boolean;
}
const StyledYourEventsWrapper = styled.div<StyledWrapperProps>(
	({ currentEvent, theme: { colors } }) => `
	padding: 16px;
	margin: 8px 0;
	background: ${colors.bgLight};
	border-radius: 10px;
	width: 100%;
	transition: 0.25s ease all;

	@media only screen and (max-width: 768px) {
		width: auto;
		margin: 8px 0;
		display: ${currentEvent ? 'none' : 'default'};
	}
`
);
const StyledEventsContainer = styled.div`
	border-radius: 10px;
	box-sizing: border-box;
	margin: 16px 16px 8px 0;
	width: 100%;
	display: flex;

	@media only screen and (max-width: 768px) {
		width: 100%;
		flex-direction: column;
	}
`;
const StyledEventsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: auto;
`;
const StyledInfoWrapper = styled(motion.div)`
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
`;
const StyledEventInfoContainer = styled.div(
	({ theme: { colors } }) => `
	border-radius: 10px;
	padding: 16px;
	box-sizing: border-box;
	margin: 8px 16px 16px 0;
	width: 100%;
	display: flex;
	background: ${colors.bgLight};
	height: auto;

	@media only screen and (max-width: 768px) {
		width: 100%;
		margin: 8px 0;
	}
`
);
const StyledAvatar = styled(motion.a)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: auto;
	border-radius: 10px;
`;
const StyledP = styled(Text)`
	padding: 0 16px 0 0;
`;
const StyledDescription = styled(Text)`
	margin: 0 0 16px 0;
`;
const StyledInfoCard = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	width: 180px;
	background: ${colors.card.darkBg};
	color: white;
	border-radius: 10px;
	height: 50px;
	margin: 0 0 16px 0;
`
);

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	border: none;
	background: none;
	transform: translateY(-2.5px);

	&:hover {
		cursor: pointer;

		img {
			transform: scale(1.3);
		}
	}
`;
const StyledSpan = styled.span`
	display: flex;
	align-items: center;
	width: 100%;
	position: relative;
`;
const StyledImg = styled.img`
	width: 24px;
	height: 24px;
	transition: 0.15s ease all;
`;
const StyledChipWrapper = styled(motion.div)`
	margin: 8px 8px 16px 0;
	min-height: 20px;
`;
