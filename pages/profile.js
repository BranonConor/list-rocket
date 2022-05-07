import DashLayout from '../components/layouts/dash-layout';
import Head from 'next/head';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import ProfilePhoto from '../components/profile-photo';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import Button from '../components/buttons/Button';

const Profile = () => {
	const { user } = useContext(UserContext);

	const handleClick = (e) => {
		e.preventDefault();
		signOut({
			callbackUrl: `/`,
		});
	};

	return (
		<DashLayout>
			<Head>
				<title>Profile | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<StyledMain>
				<h1>Your Profile</h1>
				<ProfilePhoto photo={user.image} dimensions={80} />
				<StyledCard
					initial={{ opacity: 0, width: '25%' }}
					animate={{ opacity: 1, width: 'auto' }}
					transition={{
						ease: 'easeIn',
						duration: '0.75',
						type: 'spring',
					}}>
					<StyledP>Logged in as:</StyledP>
					{user.name}
				</StyledCard>
				<StyledCard
					initial={{ opacity: 0, width: '25%' }}
					animate={{ opacity: 1, width: 'auto' }}
					transition={{
						ease: 'easeIn',
						duration: '0.9',
						type: 'spring',
					}}>
					<StyledP>Email:</StyledP>
					{user.email}
				</StyledCard>
				<Button content='Log out' onClick={handleClick} />
			</StyledMain>
		</DashLayout>
	);
};

export default Profile;

const StyledMain = styled.main`
	width: 50%;

	@media only screen and (max-width: 768px) {
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
	margin: 8px 0;
`
);
const StyledP = styled.p`
	padding: 0 8px 0 0;
	font-weight: bold;
	width: auto;
`;
