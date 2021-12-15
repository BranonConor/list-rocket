import Button from './buttons/Button';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { signIn, useSession } from 'next-auth';
import { useRouter } from 'next/router';

const Hero = () => {
	const router = useRouter();

	const handleSignIn = () => {
		router.push('/api/auth/signin');
	};

	return (
		<StyledWrapper>
			<StyledLogo src='/icons/rocket.svg' alt='Rocket Icon' />
			<StyledH1>Welcome to ListRocket</StyledH1>
			<StyledH3>
				A productivity tool for streamlining event planning
			</StyledH3>
			<Button content='Get started!' onClick={handleSignIn} />
		</StyledWrapper>
	);
};

export default Hero;

const StyledWrapper = styled.div`
	margin: 75px 0 0 0;
	padding: 32px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const StyledH1 = styled.h1`
	margin: 8px 0;
	padding: 0;
	text-align: center;
`;
const StyledH3 = styled.h3`
	margin: 0;
	padding: 0;
	text-align: center;
`;
const StyledLogo = styled.img`
	width: 40px;
`;
