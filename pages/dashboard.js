import AllEvents from '../components/events/all-events';
import DashLayout from '../components/layouts/dash-layout';
import LoadingLayout from '../components/layouts/loading-layout';
import Head from 'next/head';
import ProfilePhoto from '../components/profile-photo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Title } from '../components/typography/Title.tsx';
import { Text } from '../components/typography/Text.tsx';

const Dashboard = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { user } = useContext(UserContext);

	if (status === 'loading') {
		return <LoadingLayout>Loading...</LoadingLayout>;
	} else if (status === 'unauthenticated') {
		router.push('/');
	} else {
		return (
			<DashLayout>
				<Head>
					<title>Dashboard | List Rocket</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>

				<Title variant='heading1'>Dashboard</Title>
				<StyledGreeting
					initial={{ opacity: 0, width: '80%' }}
					animate={{ opacity: 1, width: 'auto' }}
					transition={{
						ease: 'easeIn',
						duration: '1',
						type: 'spring',
					}}>
					<ProfilePhoto photo={user.image} dimensions='40px' />
					<StyledP
						variant='body1'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							ease: 'easeIn',
							duration: '2',
							type: 'spring',
						}}>
						<Text variant='body1'>Welcome, {user.name}! ✌🏼</Text>
					</StyledP>
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

const StyledP = styled(motion.p)`
	display: flex;
	padding: 0 8px;
	box-sizing: border-box;
	border-radius: 10px;
`;
