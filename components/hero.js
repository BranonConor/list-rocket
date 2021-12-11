import Button from './buttons/Button';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { signIn, useSession } from 'next-auth';

const Hero = () => {
	const handleSignIn = () => {
		signIn('google', { callbackUrl: 'http://localhost:3000/' });
	};

	return (
		<StyledWrapper>
			<StyledLogoWrapper
				initial={{ y: '500%', opacity: 0 }}
				animate={{ y: '-25%', opacity: 1 }}
				transition={{ ease: 'easeIn', duration: '2', type: 'spring' }}>
				<StyledLogo src='/icons/rocket-plain.svg' alt='Rocket Icon' />
				<StyledFlame />
				<StyledFlame />
				<StyledFlame />
			</StyledLogoWrapper>

			<StyledContent>
				<h1>Welcome to ListRocket</h1>
				<h3>A productivity tool for streamlining event planning</h3>
				<Button content='Get started!' onClick={handleSignIn} />
			</StyledContent>
		</StyledWrapper>
	);
};

export default Hero;

const StyledWrapper = styled.div`
	margin: 75px 0 0 0;
	padding: 32px 0;
`;
const StyledContent = styled.div``;
const StyledLogoWrapper = styled(motion.div)``;
const StyledLogo = styled.img`
	width: 40px;
`;
const StyledFlame = styled.div`
	width: 3px;
	height: 3px;
	border-radius: 100%;
	background: orange;
`;
