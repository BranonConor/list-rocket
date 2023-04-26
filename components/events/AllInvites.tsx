import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { Title } from '../typography/Title';
import { UserContext } from '../../contexts/UserContext';
import { InviteCard } from '../cards/InviteCard';
import Pusher from 'pusher-js';
import { EventContext } from '../../contexts/EventContext';

export const AllInvites = () => {
	const { user, getUserData } = useContext(UserContext);
	const { getAllEvents } = useContext(EventContext);

	//pusher code
	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
		});
		//subscribe to the event channel
		const channel = pusher.subscribe(`user-channel-${user?._id}`);
		//bind a function to the event-channel-update trigger, update UI
		channel.bind(`user-channel-update-${user?._id}`, (data) => {
			//refresh the invites list for only the user in question if logged in
			if (data.user?._id === user?._id) {
				getAllEvents();
				getUserData();
			}
		});
		//unsubscribe to the event channel on cleanup
		return () => {
			pusher.unsubscribe(`user-channel-${user?._id}`);
		};
	}, [user, getUserData]);

	return (
		<StyledWrapper>
			<Title variant='heading3'>Pending Invites</Title>
			<StyledEventsContainer>
				{user?.invites?.length ? (
					user?.invites?.map((event, index) => {
						return (
							<InviteCard
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
							duration: 5,
							type: 'spring',
						}}>
						You are all caught up! ⏳
					</motion.p>
				)}
			</StyledEventsContainer>
		</StyledWrapper>
	);
};

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

	@media only screen and (max-width: 1230px) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media only screen and (max-width: 960px) {
		grid-template-columns: 1fr 1fr;
	}

	@media only screen and (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;
