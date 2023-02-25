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
