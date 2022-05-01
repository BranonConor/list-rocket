import React, { createContext, useEffect, useState } from 'react'

import axios from 'axios'

//create a user context to store logged in user info
export const UserContext = createContext();

//define provider for new user context
export const UserProvider = (props) => {

    //initialize empty user state
    const [user, setUser] = useState({});
    
    //provide methods to signout and to getUserData on sign in using cookie from getServerSideProps
    const signOut = () => {
        setUser({});
    }
    const getUserData = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/current_user`, {
            withCredentials: true
            // headers: {
            //     cookie: cookie
            // }
        });
        console.log('getUserData: ', res.data);
        setUser(res.data);
    }

    //upon render, ping current user API. If someone is auth'd their info will show up in global state. otherwise, blank
    useEffect(() => {
        getUserData();
    }, [])

    return (
        <UserContext.Provider value={{ user, signOut, getUserData }}>
            {props.children}
        </UserContext.Provider>
    )
}