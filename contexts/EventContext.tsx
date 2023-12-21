import { createContext, useContext, useEffect, useState } from 'react';

import { UserContext } from './UserContext';
import { IEvent, IEventContext } from './types';
import { useGetAllEventsQuery } from '../hooks/queries/useGetAllEventsQuery';

export const EventContext = createContext<IEventContext | null>(null);

export const EventProvider = (props) => {
	const { user } = useContext(UserContext);
	const {
		data: eventsData,
		refetch: refreshEvents,
		isLoading,
		isFetching,
	} = useGetAllEventsQuery(user?._id);
	const [events, setEvents] = useState<IEvent[]>(null);

	useEffect(() => {
		setEvents(eventsData?.data);
	}, [user?.email, eventsData]);

	// whenever the user data gets updated, refresh their events too
	useEffect(() => {
		refreshEvents();
	}, [user]);

	return (
		<EventContext.Provider
			value={{ events, refreshEvents, isLoading, isFetching }}>
			{props.children}
		</EventContext.Provider>
	);
};
