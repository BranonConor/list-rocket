import { createContext, useContext, useEffect, useState } from 'react';

import { UserContext } from './UserContext';
import axios from 'axios';
import { IEvent, IEventContext } from './types';

export const EventContext = createContext<IEventContext | null>(null);

export const EventProvider = (props) => {
	const [events, setEvents] = useState<IEvent[]>([]);
	const { user } = useContext(UserContext);

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

	return (
		<EventContext.Provider value={{ events, getAllEvents }}>
			{props.children}
		</EventContext.Provider>
	);
};
