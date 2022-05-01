import React, { createContext, useState } from 'react'

import axios from 'axios'

//create a user context to store logged in user info
export const WorkspaceContext = createContext();

//define provider for new user context
export const WorkspaceProvider = (props) => {

    //initialize empty user state
    const [currentEvent, setCurrentEvent] = useState({});

    const prepWorkspace = async (id) => {
        const res = await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/events/${id}`,
            withCredentials: true
        });
        setCurrentEvent(res.data);
    }

    // //upon render, ping current user API. If someone is auth'd their info will show up in global state. otherwise, blank
    // useEffect(() => {
    //     prepWorkspace();
    // }, [])

    return (
        <WorkspaceContext.Provider value={{ currentEvent, prepWorkspace, setCurrentEvent }}>
            {props.children}
        </WorkspaceContext.Provider>
    )
}