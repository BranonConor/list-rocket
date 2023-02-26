import { createContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { IUser, IUserContext } from './types';

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

	return (
		<UserContext.Provider value={{ user, getUserData }}>
			{props.children}
		</UserContext.Provider>
	);
};
