import AllEvents from '../components/events/all-events';
import CreateEventForm from '../components/events/create-event';
import DashLayout from '../components/layouts/dash-layout';
import Head from 'next/head';
import ProfilePhoto from '../components/profile-photo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [eventData, setEventData] = useState([]);

	useEffect(() => {
		const getEvents = async () => {
			const events = await axios.get(`http://localhost:3000/api/events`);
			setEventData(events.data.data);
		};
		getEvents();
	}, []);

	if (status === 'loading') {
		return <>Loading...</>;
	} else if (status === 'unauthenticated') {
		router.push('/');
	} else {
		return (
			<DashLayout>
				<Head>
					<title>Dashboard | List Rocket</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<h1 className='title'>Dashboard</h1>
				<StyledGreeting
					initial={{ opacity: 0, rotate: '5deg' }}
					animate={{ opacity: 1, rotate: '0deg' }}
					transition={{
						ease: 'easeIn',
						duration: '0.25',
						type: 'spring',
					}}>
					<ProfilePhoto
						photo={session.user.image}
						dimensions='40px'
					/>
					<StyledP>Welcome, {session.user.name}! ✌🏼</StyledP>
				</StyledGreeting>
				<CreateEventForm />
				<AllEvents events={eventData} />
			</DashLayout>
		);
	}
};

export default Dashboard;

const StyledGreeting = styled(motion.div)`
	width: auto;
	display: flex;
	align-items: center;
`;

const StyledP = styled.p`
	display: flex;
	padding: 0 8px;
	box-sizing: border-box;
	border-radius: 10px;
	width: 350px;
`;
