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
	pendingCollaborators: ICollaborator[];
	lists: IList[];
	controls: {
		anonymousModeIsOn: boolean;
		listHeight: 'Small' | 'Medium' | 'Large';
	};
}
export interface IEventContext {
	events: IEvent[];
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
	_id: string;
	name: string;
	description: string;
	link: string;
	resolvedBy: IUser;
}

export interface IList {
	_id: string;
	creator: IUser;
	customCreator?: string;
	items: IListItem[];
}

// DIALOG TYPES
export interface IDialogContext {
	dialogIsOpen: boolean;
	setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
}
