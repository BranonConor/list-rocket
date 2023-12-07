import { AllEvents } from '../components/events/AllEvents';
import { DashLayout } from '../components/layouts/DashLayout';
import { LoadingLayout } from '../components/layouts/LoadingLayout';
import Head from 'next/head';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Title } from '../components/typography/Title';
import { Text } from '../components/typography/Text';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllInvites } from '../components/events/AllInvites';
import { UserCard } from '../components/cards/UserCard';

const Dashboard = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { user } = useContext(UserContext);

	if (status === 'unauthenticated') {
		toast.error('You must be logged in to access that page!', {
			toastId: 'unauthenticated-route-toast',
		});
		router.push('/');
	}
	if (status === 'loading') {
		return <LoadingLayout>Loading...</LoadingLayout>;
	}

	return (
		<DashLayout>
			<Head>
				<title>Dashboard | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Title variant='heading1'>Dashboard</Title>
			<div>
				<StyledGreeting
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 1,
						type: 'spring',
					}}>
					<UserCard
						text={`Welcome, ${user?.name.split(' ')[0]}! ✌🏼`}
						image={user?.image}
					/>
				</StyledGreeting>
			</div>
			<AllEvents />
			<AllInvites />
		</DashLayout>
	);
};

export default Dashboard;

const StyledGreeting = styled(motion.div)(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	color: ${colors.white};
	border-radius: 10px;
	box-sizing: border-box;
	margin: 0 0 32px 0;
	width: 100%;
	
	@media only screen and (max-width: 768px) {
		margin: -8px 0 16px 0;

		div:first-of-type {
			justify-content: flex-start;
			box-sizing: border-box;
			min-width: 100%;
			width: 100%;
			margin: 0 0 16px 0;
		}
	}
`
);
