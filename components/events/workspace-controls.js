import ProfilePhoto from '../profile-photo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import CreateEventForm from './create-event';
import { useContext, useState } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

const WorkspaceControls = () => {
	const { events } = useContext(EventContext);
	const { currentEvent, creator, prepWorkspace, clearWorkspace } =
		useContext(WorkspaceContext);

	const handleClick = async (e, eventId, creatorId) => {
		e.preventDefault();
		prepWorkspace(eventId, creatorId);
	};
	const handleExitClick = async (e) => {
		e.preventDefault();
		clearWorkspace();
	};

	return (
		<StyledWrapper>
			{/* ---- EVENT CONTROLS ---- */}
			<StyledEventsContainer>
				<StyledYourEventsWrapper isEvent={currentEvent}>
					<h2>Your Events</h2>
					<p>Choose an event to load it into your workspace</p>

					<StyledEventsWrapper>
						{events.map((event) => {
							return (
								<StyledChip
									onClick={(e) =>
										handleClick(e, event._id, event.creator)
									}
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
										ease: 'easeIn',
										duration: '0.25',
										type: 'spring',
									}}
									isActive={
										currentEvent
											? currentEvent._id === event._id
											: null
									}>
									{event.name}
								</StyledChip>
							);
						})}
					</StyledEventsWrapper>
				</StyledYourEventsWrapper>
				{currentEvent ? null : <CreateEventForm />}
			</StyledEventsContainer>
			{/* ---- EVENT INFORMATION ---- */}
			<StyledEventInfoContainer>
				{currentEvent ? (
					<StyledInfoWrapper>
						<StyledSpan>
							<h2>Currently working on: {currentEvent.name} </h2>
							<StyledButton onClick={handleExitClick}>
								<StyledImg src='/icons/x.svg' />
							</StyledButton>
						</StyledSpan>
						<p>{currentEvent.description}</p>
						<StyledInfoCard>
							<StyledP>Event Creator:</StyledP>
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
									ease: 'easeIn',
									duration: '0.25',
									type: 'spring',
								}}>
								<ProfilePhoto
									photo={creator.image}
									dimensions='35px'
								/>
							</StyledAvatar>
						</StyledInfoCard>
					</StyledInfoWrapper>
				) : (
					<p>No event loaded... 👻</p>
				)}
			</StyledEventInfoContainer>
		</StyledWrapper>
	);
};

export default WorkspaceControls;

const StyledWrapper = styled.div`
	width: 100%;
`;
const StyledYourEventsWrapper = styled.div(
	({ isEvent, theme: { colors } }) => `
	padding: 16px;
	margin: ${isEvent ? '0 0 8px 0' : '16px 16px 8px 0'};
	background: ${colors.bgLight};
	border-radius: 10px;
	width: ${isEvent ? '100%' : '50%'};
	transition: 0.25s ease all;

	@media only screen and (max-width: 768px) {
		width: auto;
		margin: 8px 0;
	}
`
);
const StyledEventsContainer = styled.div(
	({ theme: { colors, shadows } }) => `
	border-radius: 10px;
	box-sizing: border-box;
	margin: 16px 16px 8px 0;
	width: 100%;
	display: flex;

	@media only screen and (max-width: 768px) {
		width: 100%;
		flex-direction: column;
	}
`
);
const StyledEventsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;
const StyledInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
`;
const StyledChip = styled(motion.a)(
	({ isActive, theme: { colors } }) => `
	margin: 4px 8px 4px 0;
	padding: 4px 8px;
	border-radius: 10px;
	color: ${colors.white};
	background: ${isActive ? colors.bgPurple : colors.bgDark};

	&:hover {
		cursor: pointer;
		background: ${colors.bgPurple};
	}
`
);
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
const StyledAvatar = styled(motion.a)(
	({ theme: { colors, shadows } }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	width: auto;
	border-radius: 10px;
`
);
const StyledP = styled.p`
	padding: 0 16px 0 0;
`;

const StyledInfoCard = styled.div(
	({ theme: { colors, shadows } }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	width: 180px;
	background: ${colors.bgDark};
	color: white;
	border-radius: 10px;
	height: 50px;
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
