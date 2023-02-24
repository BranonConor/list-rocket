import EventCard from '../cards/EventCard';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { Title } from '../typography/Title.tsx';

const AllEvents = () => {
	const { events } = useContext(EventContext);

	return (
		<StyledWrapper>
			<Title variant='heading2'>Your Events</Title>
			<StyledEventsContainer>
				{events.length ? (
					events.map((event, index) => {
						return (
							<EventCard
								name={event.name}
								description={event.description}
								creator={event.creator}
								id={event._id}
								key={event._id}
								animationFactor={index}
							/>
						);
					})
				) : (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							ease: 'easeIn',
							duration: '5',
							type: 'spring',
						}}>
						Start your first event! ✨
					</motion.p>
				)}
			</StyledEventsContainer>
		</StyledWrapper>
	);
};

export default AllEvents;

const StyledWrapper = styled.div`
	width: 100%;
	height: auto;
	padding: 16px 0;
	box-sizing: border-box;
`;
const StyledEventsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 16px;
	width: 100%;

	@media only screen and (max-width: 1200px) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media only screen and (max-width: 900px) {
		grid-template-columns: 1fr 1fr;
	}

	@media only screen and (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;
