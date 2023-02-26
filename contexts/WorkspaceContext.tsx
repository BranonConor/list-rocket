import { createContext, useState } from 'react';

import axios from 'axios';
import { IEvent, IUser, IWorkspaceContext } from './types';

export const WorkspaceContext = createContext<IWorkspaceContext | null>(null);

//define provider for new user context
export const WorkspaceProvider = (props) => {
	//initialize empty user state
	const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null);
	const [creator, setCreator] = useState<IUser | null>(null);

	const prepWorkspace = async (eventId: string, creatorId: string) => {
		//get the event and set it as the current event
		const eventRes = await axios.get(`/api/events/${eventId}`, {
			params: { id: eventId },
		});
		setCurrentEvent(eventRes.data.data);

		//get the creator of this event and store it in context
		const creatorRes = await axios.get(`/api/user/${creatorId}`, {
			params: { id: creatorId },
		});
		setCreator(creatorRes.data.data);
	};

	const clearWorkspace = () => {
		setCurrentEvent(null);
		setCreator(null);
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
