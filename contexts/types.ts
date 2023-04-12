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
	creator: IUser;
	collaborators: ICollaborator[];
	lists: IList[];
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
	prepWorkspace: (eventId: string) => Promise<void>;
	clearWorkspace: () => void;
}

// LIST TYPES
export interface IListItem {
	name: string;
	description: string;
	link: string;
}

export interface IList {
	_id: string;
	creator: IUser;
	items: IListItem[];
}
