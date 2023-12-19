import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { ChipButton } from '../buttons/ChipButton';
import { EventControls } from './EventControls';
import { UserCard } from '../cards/UserCard';
import { Dialog } from '../Dialog';
import { EditEventForm } from './EditEventForm';
import { useRouter } from 'next/router';
import { SkeletonLoader } from '../layouts/SkeletonLoader';

export const WorkspaceControls = () => {
	const { events } = useContext(EventContext);
	const { currentEvent, prepWorkspace, clearWorkspace, isFetching } =
		useContext(WorkspaceContext);
	const [isEventControlsDialogOpen, setIsEventControlsDialogOpen] =
		useState(false);
	const router = useRouter();
	const [eventIsBeingEdited, setEventIsBeingEdited] = useState(false);

	const handleChipButtonClick = (e, eventId) => {
		e.preventDefault();
		prepWorkspace(eventId);
		router.push(`/workspace/${eventId}`);
	};
	const handleExitClick = async (e) => {
		e?.preventDefault();
		clearWorkspace();
		router.push('/workspace');
	};

	const handleEditEvent = () => {
		setEventIsBeingEdited(true);
	};

	if (isFetching) {
		return <SkeletonLoader />;
	}

	return (
		<StyledWrapper>
			{currentEvent ? (
				<StyledEventWrapper>
					<StyledEventContent>
						{eventIsBeingEdited ? (
							<EditEventForm
								eventId={currentEvent?._id}
								name={currentEvent?.name}
								description={currentEvent?.description}
								setEventIsBeingEdited={setEventIsBeingEdited}
							/>
						) : (
							<StyledInfoWrapper>
								<StyledDescription variant='body1'>
									{currentEvent?.description}
								</StyledDescription>
								<StyledCardAndButtonWrapper>
									<UserCard
										text={`Created by ${
											currentEvent?.creator?.name?.split(
												' '
											)[0]
										}`}
										image={currentEvent?.creator?.image}
									/>
									<StyledButtonContainer>
										<StyledIconButton
											onClick={() =>
												setIsEventControlsDialogOpen(
													true
												)
											}>
											<img
												src='/icons/settings.svg'
												alt='Settings'
											/>
										</StyledIconButton>
										<StyledIconButton
											onClick={handleEditEvent}>
											<img
												src='/icons/pencil.svg'
												alt='Edit'
											/>
										</StyledIconButton>
										<StyledIconButton
											onClick={handleExitClick}>
											<img
												src='/icons/x.svg'
												alt='Exit event'
											/>
										</StyledIconButton>
									</StyledButtonContainer>
								</StyledCardAndButtonWrapper>
							</StyledInfoWrapper>
						)}
					</StyledEventContent>
				</StyledEventWrapper>
			) : (
				<StyledYourEventsWrapper>
					<Title variant='heading2'>Your Events</Title>
					<Text variant='body1'>
						{events?.length
							? 'Choose an event to load it into your workspace 👇'
							: 'Head to your dashboard to create your first event! 👏'}
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
												? currentEvent?._id ===
												  event._id
												: null
										}
									/>
								</StyledChipWrapper>
							);
						})}
					</StyledEventsWrapper>
				</StyledYourEventsWrapper>
			)}
			{isEventControlsDialogOpen && (
				<Dialog
					maxWidth='40%'
					title={'Event Controls'}
					description={'Configure your event to your liking!'}
					buttonText={'Done'}
					setDialogIsOpen={setIsEventControlsDialogOpen}>
					<EventControls
						setIsEventControlsDialogOpen={
							setIsEventControlsDialogOpen
						}
					/>
				</Dialog>
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
const StyledDescription = styled(Text)`
	max-width: fill-content;
	margin: 0;
	display: flex;
	align-items: center;

	@media only screen and (max-width: 768px) {
		height: 100%;
		min-height: 100%;
	}
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
	height: 36px;
	width: 32px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		box-shadow: none;
		animation: none;
		cursor: pointer;
		transform: scale(1.25);
	}
	img {
		filter: grayscale(100%);
		width: 16px;
		height: 16px;
	}

	@media only screen and (max-width: 768px) {
		width: auto;
	}
`;
const StyledButtonContainer = styled.div(
	({ theme: { colors, shadows } }) => `
	box-sizing: border-box;
	transition: 0.1s ease all;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	margin-left: 16px;
	background: ${colors.white};
	border-radius: 10px;
	box-shadow: ${shadows.standard};
	overflow: visible;

	@media only screen and (max-width: 768px) {
		flex-direction: column-reverse;
		margin-left: 0px;
		justify-content: flex-start;
		padding: 0 8px;
	}
`
);
const StyledEventContent = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	width: 100%;
	position: relative;
	border-radius: 10px;
	box-sizing: border-box;
	padding: 16px;
	background: ${colors.bgLight};
	overflow: visible;

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
	@media only screen and (max-width: 768px) {
		align-items: flex-start;
	}
`
);
const StyledCardAndButtonWrapper = styled.div`
	display: flex;
	width: auto;
	min-width: fit-content;
	margin-left: 16px;
	max-height: 36px;

	@media only screen and (max-width: 1050px) {
		div:first-of-type {
			display: none;
			height: 0px;
		}
	}

	@media only screen and (max-width: 768px) {
		max-height: 108px;
	}
`;
const StyledInfoWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;
