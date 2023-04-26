import { createContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { IUser, IUserContext } from './types';
import Pusher from 'pusher-js';

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = (props) => {
	//initialize empty user state
	const [user, setUser] = useState<IUser>(null);
	const { data: session, status } = useSession();

	const getUserData = async () => {
		if (status === 'authenticated') {
			const res = await axios.get(`/api/user`, {
				params: {
					email: session.user.email,
				},
			});
			setUser(res.data.data);
		}
	};

	//upon render, ping current user API. If someone is auth'd their info will show up in global state. otherwise, blank
	useEffect(() => {
		getUserData();
	}, [status]);

	//start a pusher channel for this user to listen to updates
	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
		});
		//subscribe to the user channel
		const channel = pusher.subscribe(`user-channel-${user?._id}`);
		//bind a function to the user-channel-update trigger, update UI
		channel.bind(`user-channel-update-${user?._id}`, (data) => {
			//refresh the invites list for only the user in question if logged in
			if (data.user?._id === user?._id) {
				getUserData();
			}
		});
		//unsubscribe to the user channel on cleanup
		return () => {
			pusher.disconnect();
		};
	}, [getUserData]);

	return (
		<UserContext.Provider value={{ user, getUserData }}>
			{props.children}
		</UserContext.Provider>
	);
};
