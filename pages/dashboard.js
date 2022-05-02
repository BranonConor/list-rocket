import AllEvents from '../components/events/all-events';
import CreateEventForm from '../components/events/create-event';
import DashLayout from '../components/layouts/dash-layout';
import Head from 'next/head';
import ProfilePhoto from '../components/profile-photo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Dashboard = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { user } = useContext(UserContext);

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
					<ProfilePhoto photo={user.image} dimensions='40px' />
					<StyledP>Welcome, {user.name}! ✌🏼</StyledP>
				</StyledGreeting>
				<AllEvents />
			</DashLayout>
		);
	}
};

export default Dashboard;

const StyledGreeting = styled(motion.div)(
	({ theme: { colors, shadows } }) => `
	max-width: 100%;
	display: flex;
	align-items: center;
	background: ${colors.bgLight};
	border-radius: 10px;
	padding: 8px;
`
);

const StyledP = styled.p`
	display: flex;
	padding: 0 8px;
	box-sizing: border-box;
	border-radius: 10px;
	width: 350px;
`;
