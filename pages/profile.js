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
					initial={{ opacity: 0, width: '80%' }}
					animate={{ opacity: 1, width: 'auto' }}
					transition={{
						ease: 'easeIn',
						duration: '0.75',
						type: 'spring',
					}}>
					<StyledP
						initial={{ opacity: 0, width: 'auto' }}
						animate={{ opacity: 1, width: 'auto' }}
						transition={{
							ease: 'easeIn',
							duration: '2',
							type: 'spring',
						}}>
						Logged in as:
					</StyledP>
					<StyledP
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							ease: 'easeIn',
							duration: '2',
							type: 'spring',
						}}>
						{user.name}
					</StyledP>
				</StyledCard>
				<StyledCard
					initial={{ opacity: 0, width: '80%' }}
					animate={{ opacity: 1, width: 'auto' }}
					transition={{
						ease: 'easeIn',
						duration: '1',
						type: 'spring',
					}}>
					<StyledP
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							ease: 'easeIn',
							duration: '2',
							type: 'spring',
						}}>
						Email:
					</StyledP>
					<StyledP
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							ease: 'easeIn',
							duration: '2',
							type: 'spring',
						}}>
						{user.email}
					</StyledP>
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
	margin: 16px 0;
`
);
const StyledP = styled(motion.p)`
	padding: 0 8px 0 0;
	width: auto;
`;
