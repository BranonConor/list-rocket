import DashLayout from '../components/layouts/dash-layout';
import Head from 'next/head';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import ProfilePhoto from '../components/profile-photo';
import { motion } from 'framer-motion';

const Profile = () => {
	const { user } = useContext(UserContext);

	return (
		<DashLayout>
			<Head>
				<title>Profile | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<h1>Your Profile</h1>
				<ProfilePhoto photo={user.image} dimensions={80} />
				<StyledCard
					initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
					animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
					transition={{
						ease: 'easeIn',
						duration: '0.25',
						type: 'spring',
					}}>
					<StyledP>Logged in as:</StyledP>
					{user.name}
				</StyledCard>
				<StyledCard
					initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
					animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
					transition={{
						ease: 'easeIn',
						duration: '0.3',
						type: 'spring',
					}}>
					<StyledP>Email:</StyledP>
					{user.email}
				</StyledCard>
			</main>
		</DashLayout>
	);
};

export default Profile;

const StyledCard = styled(motion.div)(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	background: ${colors.bgLight};
	padding: 16px;
	border-radius: 10px;
	margin: 8px 0;
	width: 50%;

	@media only screen and (max-width: 768px) {
		width: 100%;
	}
`
);
const StyledP = styled.p`
	padding: 0 8px 0 0;
	font-weight: bold;
`;
