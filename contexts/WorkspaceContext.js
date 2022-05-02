import React, { createContext, useState } from 'react';

import axios from 'axios';

//create a user context to store logged in user info
export const WorkspaceContext = createContext();

//define provider for new user context
export const WorkspaceProvider = (props) => {
	//initialize empty user state
	const [currentEvent, setCurrentEvent] = useState(undefined);
	const [creator, setCreator] = useState({});

	const prepWorkspace = async (eventId, creatorId) => {
		const eventRes = await axios.get(`/api/events/${eventId}`, {
			params: { id: eventId },
		});
		setCurrentEvent(eventRes.data.data);

		const creatorRes = await axios.get(`/api/user/${creatorId}`, {
			params: { id: creatorId },
		});
		setCreator(creatorRes.data.data);
	};

	const clearWorkspace = () => {
		setCurrentEvent(undefined);
		setCreator({});
	};

	return (
		<WorkspaceContext.Provider
			value={{
				currentEvent,
				setCurrentEvent,
				creator,
				prepWorkspace,
				clearWorkspace,
			}}>
			{props.children}
		</WorkspaceContext.Provider>
	);
};
