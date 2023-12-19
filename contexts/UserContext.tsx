import { createContext, useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { IUser, IUserContext } from './types';
import Pusher from 'pusher-js';
import { useGetUserQuery } from '../hooks/queries/useGetUserQuery';

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = (props) => {
	//initialize empty user state
	const [user, setUser] = useState<IUser>(null);
	const { data: session, status } = useSession();
	const { data } = useGetUserQuery(session?.user.email as string);

	//when session status changes update the user state with the query data
	useEffect(() => {
		setUser(data?.data);
	}, [status, data]);

	//start a pusher channel for this user to listen to updates
	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
		});
		//subscribe to the user channel
		const invitesChannel = pusher.subscribe(`user-channel-${user?._id}`);
		//bind a function to the user-channel-update trigger, update UI
		invitesChannel.bind(`user-channel-update-${user?._id}`, (data) => {
			//refresh the invites list for only the user in question if logged in
			if (data.user?._id === user?._id) {
				// getUserData();
			}
		});
		//unsubscribe to the user channel on cleanup
		return () => {
			pusher.disconnect();
		};
	}, [user]);

	return (
		<UserContext.Provider value={{ user }}>
			{props.children}
		</UserContext.Provider>
	);
};
