import { createContext, useState } from 'react';

import axios from 'axios';
import { IEvent, IWorkspaceContext } from './types';
import { useGetCurrentEventQuery } from '../pages/hooks/queries/useGetCurrentEventQuery';

export const WorkspaceContext = createContext<IWorkspaceContext | null>(null);

//define provider for new user context
export const WorkspaceProvider = (props) => {
	//initialize empty user state
	const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null);

	const prepWorkspace = async (eventId: string) => {
		//get the event and set it as the current event
		const eventRes = await axios.get(`/api/events/${eventId}`);
		setCurrentEvent(eventRes?.data?.data);
	};

	const clearWorkspace = () => {
		setCurrentEvent(null);
	};

	//TODO - move Event Pusher connection code to this context, and have it
	//rerender whenever prepWorkspace is called!

	return (
		<WorkspaceContext.Provider
			value={{
				currentEvent,
				setCurrentEvent,
				prepWorkspace,
				clearWorkspace,
			}}>
			{props.children}
		</WorkspaceContext.Provider>
	);
};
