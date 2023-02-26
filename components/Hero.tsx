import { PrimaryButton } from './buttons/PrimaryButton';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Title } from './typography/Title';

export const Hero = () => {
	const router = useRouter();

	const handleSignIn = () => {
		router.push('/api/auth/signin');
	};

	return (
		<StyledWrapper>
			<StyledLogo src='/icons/rocket.svg' alt='Rocket Icon' />
			<StyledH1 variant='heading1'>Welcome to ListRocket</StyledH1>
			<StyledH3 variant='heading4'>
				A productivity tool for streamlining event planning
			</StyledH3>
			<PrimaryButton
				variant='large'
				content='Get started!'
				onClick={handleSignIn}
			/>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	margin: 75px 0 0 0;
	padding: 32px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const StyledH1 = styled(Title)`
	margin: 8px 0;
	padding: 0;
	text-align: center;
`;
const StyledH3 = styled(Title)`
	margin: 16px 0 32px 0;
	padding: 0;
	text-align: center;
`;
const StyledLogo = styled.img`
	width: 40px;
`;
