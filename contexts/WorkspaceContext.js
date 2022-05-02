import React, { createContext, useState, useEffect } from 'react';

import axios from 'axios';

//create a user context to store logged in user info
export const WorkspaceContext = createContext();

//define provider for new user context
export const WorkspaceProvider = (props) => {
	//initialize empty user state
	const [currentEvent, setCurrentEvent] = useState(undefined);
	const [creator, setCreator] = useState({});

	const prepWorkspace = async (eventId, creatorId) => {
		const eventRes = await axios.get(
			`http://localhost:3000/api/events/${eventId}`,
			{
				params: { id: eventId },
			}
		);
		setCurrentEvent(eventRes.data.data);
		console.log(eventRes.data);

		const creatorRes = await axios.get(
			`http://localhost:3000/api/user/${creatorId}`,
			{
				params: { id: creatorId },
			}
		);
		console.log('Creator: ', creatorRes);
		setCreator(creatorRes.data.data);
	};

	return (
		<WorkspaceContext.Provider
			value={{ currentEvent, creator, prepWorkspace, setCurrentEvent }}>
			{props.children}
		</WorkspaceContext.Provider>
	);
};
