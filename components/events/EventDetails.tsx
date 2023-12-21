import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Text } from '../typography/Text';
import { EditEventForm } from './EditEventForm';
import { useContext, useState } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import router from 'next/router';
import { SkeletonLoader } from '../layouts/SkeletonLoader';
import { UserCard } from '../cards/UserCard';
import { Dialog } from '../Dialog';
import { EventControls } from './EventControls';

export const EventDetails = () => {
	const { currentEvent, clearWorkspace, isLoading } =
		useContext(WorkspaceContext);

	const [eventIsBeingEdited, setEventIsBeingEdited] = useState(false);
	const [isEventControlsDialogOpen, setIsEventControlsDialogOpen] =
		useState(false);

	const handleExitClick = async (e) => {
		e?.preventDefault();
		clearWorkspace();
		router.push('/workspace');
	};

	const handleEditEvent = () => {
		setEventIsBeingEdited(true);
	};

	if (isLoading) {
		return (
			<StyledSkeletonWrapper>
				<SkeletonLoader height='68px' />
			</StyledSkeletonWrapper>
		);
	}

	return (
		<>
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
											setIsEventControlsDialogOpen(true)
										}>
										<img
											src='/icons/settings.svg'
											alt='Settings'
										/>
									</StyledIconButton>
									<StyledIconButton onClick={handleEditEvent}>
										<img
											src='/icons/pencil.svg'
											alt='Edit'
										/>
									</StyledIconButton>
									<StyledIconButton onClick={handleExitClick}>
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
		</>
	);
};

const StyledEventWrapper = styled.div`
	width: 100%;
	display: flex;
	height: auto;
	margin-bottom: 16px;

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
const StyledSkeletonWrapper = styled.div`
	margin: 16px 0 0 0;

	@media only screen and (max-width: 768px) {
		margin: 16px 0;
	}
`;
