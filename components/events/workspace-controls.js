import ProfilePhoto from '../profile-photo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import CreateEventForm from './create-event';
import { useContext } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

const WorkspaceControls = () => {
	const { events } = useContext(EventContext);
	const { currentEvent, creator, prepWorkspace } =
		useContext(WorkspaceContext);

	const handleClick = async (e, eventId, creatorId) => {
		e.preventDefault();
		prepWorkspace(eventId, creatorId);
	};

	return (
		<StyledWrapper>
			{/* ---- EVENT CONTROLS ---- */}
			<StyledEventsContainer>
				<StyledYourEventsWrapper>
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
									}}>
									{event.name}
								</StyledChip>
							);
						})}
					</StyledEventsWrapper>
				</StyledYourEventsWrapper>
				<CreateEventForm />
			</StyledEventsContainer>
			{/* ---- EVENT INFORMATION ---- */}
			<StyledEventInfoContainer>
				{currentEvent ? (
					<StyledInfoWrapper>
						<h2>Currently working on: {currentEvent.name}</h2>
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
	({ theme: { colors } }) => `
	padding: 16px;
	margin: 16px 16px 8px 0;
	background: ${colors.bgLight};
	border-radius: 10px;
	width: 50%;

	@media only screen and (max-width: 768px) {
		width: auto;
		margin: 0;
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
`;
const StyledChip = styled(motion.a)(
	({ theme: { colors } }) => `
	margin: 4px 8px 4px 0;
	padding: 4px 8px;
	border-radius: 10px;
	color: ${colors.white};
	background: ${colors.bgDark};

	&:hover {
		cursor: pointer;
		background: ${colors.bgPurple};
	}
`
);
const StyledEventInfoContainer = styled(motion.a)(
	({ theme: { colors } }) => `
	border-radius: 10px;
	padding: 16px;
	box-sizing: border-box;
	margin: 8px 16px 16px 0;
	width: 100%;
	display: flex;
	background: ${colors.bgLight};

	@media only screen and (max-width: 768px) {
		width: 100%;
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
const StyledInfoCard = styled.div`
	display: flex;
`;
