import React, { createContext, useContext, useEffect, useState } from 'react';

import { UserContext } from './UserContext';
import axios from 'axios';

//create a user context to store logged in user info
export const EventContext = createContext();

//define provider for new user context
export const EventProvider = (props) => {
	//initialize empty user state
	const [events, setEvents] = useState([]);
	const { user } = useContext(UserContext);

	const getAllEvents = async () => {
		const res = await axios.get(`http://localhost:3000/api/events`, {
			params: {
				creatorId: user._id,
			},
		});
		setEvents(res.data.data);
	};

	//upon render, ping current user API. If someone is auth'd their info will show up in global state. otherwise, blank
	useEffect(() => {
		getAllEvents();
	}, [user]);

	return (
		<EventContext.Provider value={{ events, getAllEvents }}>
			{props.children}
		</EventContext.Provider>
	);
};
