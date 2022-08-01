import DashLayout from '../components/layouts/dash-layout';
import Head from 'next/head';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import ProfilePhoto from '../components/profile-photo';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { PrimaryButton } from '../components/buttons/PrimaryButton.tsx';
import { Title } from '../components/typography/Title.tsx';
import { Text } from '../components/typography/Text.tsx';

const Profile = () => {
	const { user } = useContext(UserContext);

	const handleClick = (e) => {
		e?.preventDefault();
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
				<Title variant='heading1'>Your Profile</Title>
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
						<Text variant='body1'>Logged in as: {user.name}</Text>
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
						<Text variant='body1'>Email: {user.email}</Text>
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
