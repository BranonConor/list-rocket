import { DashLayout } from '../components/layouts/DashLayout';
import Head from 'next/head';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { Title } from '../components/typography/Title';
import { Text } from '../components/typography/Text';
import { EventContext } from '../contexts/EventContext';
import { toast } from 'react-toastify';
import router from 'next/router';
import { LoadingLayout } from '../components/layouts/LoadingLayout';

const Profile = () => {
	const { user } = useContext(UserContext);
	const { events } = useContext(EventContext);

	const handleClick = (e: any) => {
		e?.preventDefault();
		signOut({
			callbackUrl: `/`,
		});
	};

	const { data: session, status } = useSession();
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
				<title>Profile | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<StyledMain>
				<Title variant='heading1'>Your Profile</Title>
				<ProfilePhoto
					photo={user?.image}
					dimensions='100px'
					hasBoxShadow={true}
				/>
				<StyledCard
					initial={{ opacity: 0, width: '80%' }}
					animate={{ opacity: 1, width: 'auto' }}
					transition={{
						duration: 0.75,
						type: 'spring',
					}}>
					<StyledP
						initial={{ opacity: 0, width: 'auto' }}
						animate={{ opacity: 1, width: 'auto' }}
						transition={{
							duration: 2,
							type: 'spring',
						}}>
						<StyledText variant='body1'>
							<img src='/icons/profile.svg' alt='' />
							<b>User</b>
						</StyledText>
						<Text variant='overline'>{user?.name}</Text>
					</StyledP>
				</StyledCard>
				<StyledCard
					initial={{ opacity: 0, width: '80%' }}
					animate={{ opacity: 1, width: 'auto' }}
					transition={{
						duration: 1,
						type: 'spring',
					}}>
					<StyledP
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 2,
							type: 'spring',
						}}>
						<StyledText variant='body1'>
							<img src='/icons/email.svg' alt='' />
							<b>Email: </b>
						</StyledText>
						<Text variant='overline'>{user?.email}</Text>
					</StyledP>
				</StyledCard>
				<StyledCard
					initial={{ opacity: 0, width: '80%' }}
					animate={{ opacity: 1, width: 'auto' }}
					transition={{
						duration: 1.25,
						type: 'spring',
					}}>
					<StyledP
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 2.5,
							type: 'spring',
						}}>
						<StyledText variant='body1'>
							<img src='/icons/data.svg' alt='' />
							<b>Total Events: </b>
						</StyledText>
						<Text variant='overline'>{events?.length}</Text>
					</StyledP>
				</StyledCard>
				<PrimaryButton
					variant='large'
					content='Log out'
					onClick={handleClick}
				/>
			</StyledMain>
		</DashLayout>
	);
};

export default Profile;

const StyledMain = styled.main`
	width: 50%;

	@media only screen and (max-width: 1000px) {
		width: 100%;
	}
`;
const StyledCard = styled(motion.div)(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	background: ${colors.bgLight};
	padding: 16px;
	border-radius: 10px;
	margin: 16px 0;
	overflow-x: auto;

	@media only screen and (max-width: 600px) {
		padding: 16px;
	}
`
);
const StyledP = styled(motion.p)`
	padding: 0 8px 0 0;
	margin: 0;

	width: auto;

	@media only screen and (max-width: 600px) {
		padding: 0;
	}
`;
const StyledText = styled(Text)`
	display: flex;
	align-items: center;
	margin: 8px 0;

	img {
		margin-right: 8px;
		width: 20px;
		height: 20px;
	}
`;
