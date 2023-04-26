import { createContext, useContext, useEffect, useState } from 'react';

import { UserContext } from './UserContext';
import axios from 'axios';
import { IEvent, IEventContext } from './types';
import Pusher from 'pusher-js';

export const EventContext = createContext<IEventContext | null>(null);

export const EventProvider = (props) => {
	const [events, setEvents] = useState<IEvent[]>([]);
	const { user, getUserData } = useContext(UserContext);

	const getAllEvents = async () => {
		const res = await axios.get(`/api/events`, {
			params: {
				id: user?._id,
			},
		});
		setEvents(res.data.data);
	};

	useEffect(() => {
		getAllEvents();
	}, [user]);

	//start a pusher channel for this user to listen to updates
	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
		});
		//subscribe to the user channel
		const channel = pusher.subscribe(`user-channel-${user?._id}`);
		//bind a function to the user-channel-update trigger, update UI
		channel.bind(`user-channel-update-${user?._id}`, (data) => {
			//refresh the invites list for only the user in question if logged in
			getUserData();
			getAllEvents();
		});
		//unsubscribe to the user channel on cleanup
		return () => {
			pusher.disconnect();
		};
	}, [getUserData]);

	return (
		<EventContext.Provider value={{ events, getAllEvents }}>
			{props.children}
		</EventContext.Provider>
	);
};
