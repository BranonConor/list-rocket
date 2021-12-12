import ProfilePhoto from '../profile-photo';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const WorkspaceControls = () => {
	const handleLoadEvent = async (e, id) => {
		e.preventDefault();
		console.log(id);
		prepWorkspace(id);
	};

	//MOCK DATA
	const events = [
		{
			name: 'Event 1',
			_id: '1',
		},
		{
			name: 'Event 2',
			_id: '2',
		},
	];

	const currentEvent = false;

	return (
		<StyledWrapper>
			{/* ---- EVENT CONTROLS ---- */}
			<StyledEventsContainer>
				<h2>Your Events</h2>
				<p>Choose an event to load it into your workspace</p>
				<StyledEventsWrapper>
					{events.map((event) => {
						return (
							<StyledEvent
								onClick={(e) => handleLoadEvent(e, event._id)}
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
							</StyledEvent>
						);
					})}
				</StyledEventsWrapper>
			</StyledEventsContainer>
			{/* ---- EVENT INFORMATION ---- */}
			<StyledEventInfoContainer>
				{currentEvent ? (
					<>
						<h2>Currently working on: {currentEvent.name}</h2>
						<p>Event Creator:</p>
						<StyledInfoCard
							initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
							animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
							transition={{
								ease: 'easeIn',
								duration: '0.25',
								type: 'spring',
							}}>
							<ProfilePhoto
								photo={currentEvent.creator.photo}
								dimensions='35px'
							/>
							<p>
								{currentEvent.creator.firstName}{' '}
								{currentEvent.creator.lastName}
							</p>
						</StyledInfoCard>
					</>
				) : (
					<p>No event loaded... 👻</p>
				)}
			</StyledEventInfoContainer>
		</StyledWrapper>
	);
};

export default WorkspaceControls;

const StyledWrapper = styled.div`
	display: flex;
	width: 100%;
	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
`;
const StyledEventsContainer = styled.div(
	({ theme: { colors, shadows } }) => `
	border-radius: 10px;
	padding: 16px;
	box-sizing: border-box;
	margin: 16px 16px 16px 0;
	width: 25%;
	background: ${colors.bgLight};
	box-shadow: ${shadows.standard};

	@media only screen and (max-width: 768px) {
		width: 100%;
	}
`
);
const StyledEventsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;
const StyledEvent = styled(motion.a)(
	({ theme: { colors } }) => `
	margin: 4px 8px 4px 0;
	padding: 0 8px;
	border-radius: 10px;
	color: ${colors.white};
	background: ${colors.secondaryGradient};
`
);
const StyledEventInfoContainer = styled(motion.a)(
	({ theme: { colors, shadows } }) => `
	border-radius: 10px;
	padding: 16px;
	box-sizing: border-box;
	margin: 16px 16px 16px 0;
	width: 75%;
	background: ${colors.bgLight};
	box-shadow: ${shadows.standard};

	@media only screen and (max-width: 768px) {
		width: 100%;
	}
`
);
const StyledInfoCard = styled(motion.a)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: auto;
	padding: 8px 16px;
	border-radius: 5px;
	background: $blue-bg;
`;
