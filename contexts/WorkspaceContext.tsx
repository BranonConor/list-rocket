import { createContext, useEffect, useState } from 'react';

import { IEvent, IWorkspaceContext } from './types';
import { useGetCurrentEventQuery } from '../hooks/queries/useGetCurrentEventQuery';

export const WorkspaceContext = createContext<IWorkspaceContext | null>(null);

export const WorkspaceProvider = (props) => {
	const [currentEventId, setCurrentEventId] = useState<string | null>(null);
	const {
		data,
		refetch: refreshEvent,
		isLoading,
		isFetching,
	} = useGetCurrentEventQuery(currentEventId);
	const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null);

	const prepWorkspace = async (eventId: string) => {
		//get the event and set it as the current event
		setCurrentEventId(eventId);
	};

	const clearWorkspace = () => {
		setCurrentEvent(null);
		setCurrentEventId(null);
	};

	useEffect(() => {
		setCurrentEvent(data);
	}, [data, currentEventId]);

	//TODO - move Event Pusher connection code to this context, and have it
	//rerender whenever prepWorkspace is called!

	return (
		<WorkspaceContext.Provider
			value={{
				currentEvent,
				setCurrentEvent,
				prepWorkspace,
				refreshEvent,
				clearWorkspace,
				isLoading,
				isFetching,
			}}>
			{props.children}
		</WorkspaceContext.Provider>
	);
};
