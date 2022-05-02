import React, { createContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useSession } from 'next-auth/react';

//create a user context to store logged in user info
export const UserContext = createContext();

//define provider for new user context
export const UserProvider = (props) => {
	//initialize empty user state
	const [user, setUser] = useState({});
	const { data: session, status } = useSession();

	const getUserData = async () => {
		if (status === 'authenticated') {
			const res = await axios.get(`http://localhost:3000/api/user`, {
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
