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
	anonymousModeIsOn: boolean;
	creator: IUser;
	collaborators: ICollaborator[];
	pendingCollaborators: ICollaborator[];
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
	invites: IEvent[];
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
	anonymousModeIsOn: boolean;
	setAnonymousModeIsOn: Dispatch<SetStateAction<boolean>>;
	prepWorkspace: (eventId: string) => Promise<void>;
	clearWorkspace: () => void;
}

// LIST TYPES
export interface IListItem {
	_id: string;
	name: string;
	description: string;
	link: string;
	resolvedBy: IUser;
}

export interface IList {
	_id: string;
	creator: IUser;
	items: IListItem[];
}
