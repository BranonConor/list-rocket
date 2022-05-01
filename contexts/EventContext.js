import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

//create a user context to store logged in user info
export const EventContext = createContext();

//define provider for new user context
export const EventProvider = (props) => {
	//initialize empty user state
	const [events, setEvents] = useState([]);

	const getAllEvents = async () => {
		const events = await axios.get(`http://localhost:3000/api/events`);
		setEvents(events.data.data);
	};

	//upon render, ping current user API. If someone is auth'd their info will show up in global state. otherwise, blank
	useEffect(() => {
		getAllEvents();
	}, []);

	return (
		<EventContext.Provider value={{ events, getAllEvents }}>
			{props.children}
		</EventContext.Provider>
	);
};
