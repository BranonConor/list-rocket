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
				<StyledTitleWrapper
					initial={{ opacity: 0, x: '32px' }}
					animate={{ opacity: 1, x: '0' }}
					transition={{
						duration: 0.25,
						type: 'spring',
					}}>
					<Title variant='heading1'>Your Profile</Title>
				</StyledTitleWrapper>
				<ProfilePhoto
					photo={user?.image}
					dimensions='100px'
					hasBoxShadow={true}
				/>
				<StyledWrapper>
					<StyledCard
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 0.75,
							type: 'spring',
						}}>
						<StyledP
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 2,
								type: 'spring',
							}}>
							<StyledTitle variant='heading4'>
								<img src='/icons/profile.svg' alt='' />
								User
							</StyledTitle>
							<Text variant='overline'>{user?.name}</Text>
						</StyledP>
					</StyledCard>
					<StyledCard
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
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
							<StyledTitle variant='heading4'>
								<img src='/icons/email.svg' alt='' />
								Email:
							</StyledTitle>
							<Text variant='overline'>{user?.email}</Text>
						</StyledP>
					</StyledCard>
					<StyledCard
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
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
							<StyledTitle variant='heading4'>
								<img src='/icons/data.svg' alt='' />
								Total Events:
							</StyledTitle>
							<Text variant='overline'>{events?.length}</Text>
						</StyledP>
					</StyledCard>
				</StyledWrapper>

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
	width: 100%;
`;
const StyledWrapper = styled.div`
	margin: 16px 0;
	border-radius: 5px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 16px;

	@media only screen and (max-width: 1200px) {
		grid-template-columns: 1fr 1fr;
	}
	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const StyledCard = styled(motion.div)(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	background: ${colors.bgLight};
	padding: 16px;
	border-radius: 10px;
	overflow-x: auto;
	width: auto;

	@media only screen and (max-width: 600px) {
		padding: 16px;
	}
`
);
const StyledP = styled(motion.p)`
	padding: 0 8px 0 0;
	margin: 0;

	@media only screen and (max-width: 600px) {
		padding: 0;
	}

	img {
		transform: translateY(-2px);
	}
`;
const StyledTitle = styled(Title)`
	display: flex;
	align-items: center;
	margin: 8px 0;

	img {
		margin-right: 8px;
		width: 20px;
		height: 20px;
	}
`;
const StyledTitleWrapper = styled(motion.div)``;
