import { Dispatch, SetStateAction } from 'react';

// EVENTS TYPES
export interface ICollaborator {
	_id: string;
	name: string;
	email: string;
	image: string;
}
export interface IEvent {
	_id: string;
	name: string;
	description: string;
	creator: string;
	collaborators: ICollaborator[];
}
export interface IEventContext {
	events: IEvent[];
	getAllEvents: () => void;
}

// USER TYPES
export interface IUser {
	_id: string;
	name: string;
	email: string;
	image: string;
	emailVerified: null;
}

export interface IUserContext {
	user: IUser;
	getUserData: () => void;
}

// WORKSPACE TYPES
export interface IWorkspace {
	_id: string;
	name: string;
	email: string;
	image: string;
	emailVerified: null;
}

export interface IWorkspaceContext {
	currentEvent: IEvent;
	setCurrentEvent: Dispatch<SetStateAction<IEvent>>;
	creator: IUser;
	prepWorkspace: (eventId: string, creatorId: string) => Promise<void>;
	clearWorkspace: () => void;
}
