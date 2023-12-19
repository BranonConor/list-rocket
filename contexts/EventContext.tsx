import { createContext, useContext, useEffect, useState } from 'react';

import { UserContext } from './UserContext';
import { IEvent, IEventContext } from './types';
import { useGetAllEventsQuery } from '../hooks/queries/useGetAllEventsQuery';

export const EventContext = createContext<IEventContext | null>(null);

export const EventProvider = (props) => {
	const { user } = useContext(UserContext);
	const { data } = useGetAllEventsQuery(user?._id);
	const [events, setEvents] = useState<IEvent[]>(null);

	useEffect(() => {
		setEvents(data?.data);
	}, [user?.email, data]);

	return (
		<EventContext.Provider value={{ events }}>
			{props.children}
		</EventContext.Provider>
	);
};
