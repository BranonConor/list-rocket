import EventCard from '../cards/event-card';
import { EventContext } from '../../contexts/EventContext';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext } from 'react';

const AllEvents = () => {
	const { events } = useContext(EventContext);

	return (
		<StyledWrapper>
			<h2>Your Events</h2>
			<StyledEventsContainer>
				{events.length ? (
					events.map((event) => {
						return (
							<EventCard
								name={event.name}
								description={event.description}
								id={event._id}
								key={event._id}
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
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-wrap: wrap;
`;
