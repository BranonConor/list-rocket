import AllEvents from '../components/events/all-events';
import DashLayout from '../components/layouts/dash-layout';
import LoadingLayout from '../components/layouts/loading-layout';
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
import CreateEventForm from '../components/events/CreateEvent';
import 'react-toastify/dist/ReactToastify.css';

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
			<StyledDashWrapper>
				<div>
					<StyledGreeting
						initial={{ opacity: 0, width: '80%' }}
						animate={{ opacity: 1, width: '100%' }}
						transition={{
							duration: 1,
							type: 'spring',
						}}>
						<ProfilePhoto photo={user?.image} dimensions='40px' />
						<StyledP
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 1,
								type: 'spring',
							}}>
							<Text variant='body1'>
								Welcome, {user?.name}! ✌🏼
							</Text>
						</StyledP>
					</StyledGreeting>
					<CreateEventForm />
				</div>
			</StyledDashWrapper>
			<AllEvents />
		</DashLayout>
	);
};

export default Dashboard;

const StyledGreeting = styled(motion.div)(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	background: ${colors.tertiaryGradient};
	color: ${colors.white};
	border-radius: 10px;
	box-sizing: border-box;
	padding: 8px;
	height: 60px;
	margin: 0 0 16px 0;

	@media only screen and (max-width: 768px) {
		min-width: 100%;
		width: 100%;
		margin: 16px 0;
	}
`
);

const StyledP = styled(motion.p)`
	display: flex;
	padding: 0 8px;
	box-sizing: border-box;
	border-radius: 10px;
`;

const StyledDashWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 16px;

	@media only screen and (max-width: 1600px) {
		grid-template-columns: 1fr 1fr;
	}

	@media only screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;