import { motion } from 'framer-motion';
import { getProviders, signIn, getSession } from 'next-auth/react';
import styled from 'styled-components';
import Button from '../components/buttons/Button';

export default function SignIn({ providers }) {
	return (
		<StyledWrapper>
			{Object.values(providers).map((provider) => (
				<StyledProviderWrapper key={provider.name}>
					<StyledH1>
						Sign in with{' '}
						<StyledGoogleLogo src='/icons/google.svg' />
					</StyledH1>
					<StyledH4>Get ready for liftoff.</StyledH4>
					<Button
						content='Sign in with Google'
						onClick={() => signIn(provider.id)}
					/>
				</StyledProviderWrapper>
			))}
			<StyledRocketWrapper
				initial={{ y: '100px', opacity: 0 }}
				animate={{ y: '0px', opacity: 1 }}
				transition={{
					ease: 'easeIn',
					duration: '2',
					type: 'spring',
				}}>
				<StyledImage
					animate={{
						y: [0, 10, 0, 0, 2, -10, 0],
						repeat: Infinity,
					}}
					transition={{
						duration: '1',
						type: 'spring',
						repeat: Infinity,
					}}
					src='/icons/rocket-plain.svg'
				/>
				<StyledFlameWrapper>
					<StyledFlame
						size='2px'
						animate={{
							y: [-50, 50],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.2',
							delay: 0.4,
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='3px'
						animate={{
							y: [-100, 100],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.4',
							delay: 0.5,
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='4px'
						animate={{
							y: [-80, 80],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.4',
							delay: 0.1,
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='3px'
						animate={{
							y: [-100, 150],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.2',
							delay: 0.3,
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='6px'
						animate={{
							y: [-100, 140],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.5',
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='3px'
						animate={{
							y: [-100, 130],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.2',
							delay: 0.3,
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='7px'
						animate={{
							y: [-100, 150],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.55',
							delay: 0.1,
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='6px'
						animate={{
							y: [-100, 135],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.5',
							delay: 0.1,
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='3px'
						animate={{
							y: [-100, 120],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.2',
							delay: 0.3,
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='5px'
						animate={{
							y: [-50, 50],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.4',
							delay: 0.4,
							repeat: Infinity,
						}}
					/>
					<StyledFlame
						size='3px'
						animate={{
							y: [-50, 50],
							opacity: [1, 0],
							repeat: Infinity,
						}}
						transition={{
							duration: '0.2',
							delay: 0.3,
							repeat: Infinity,
						}}
					/>
				</StyledFlameWrapper>
			</StyledRocketWrapper>
		</StyledWrapper>
	);
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
	const providers = await getProviders();
	const { req } = context;
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: { destination: '/dashboard' },
		};
	}
	return {
		props: { providers },
	};
}
const StyledWrapper = styled.div(
	({ theme: { colors } }) => `
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nNjAwJyBoZWlnaHQ9JzYwMCcgdmlld0JveD0nMCAwIDE1MCAxNTAnPgo8ZmlsdGVyIGlkPSdpJyB4PScwJyB5PScwJz4KCTxmZUNvbG9yTWF0cml4IHR5cGU9J21hdHJpeCcgdmFsdWVzPScxIDAgMCAwIDAgIDAgMSAwIDAgMCAgMCAwIDEgMCAwICAwIDAgMCAwIDAnIC8+CjwvZmlsdGVyPgo8ZmlsdGVyIGlkPSduJyB4PScwJyB5PScwJz4KCTxmZVR1cmJ1bGVuY2UgdHlwZT0ndHVyYnVsZW5jZScgYmFzZUZyZXF1ZW5jeT0nLjcnIHJlc3VsdD0nZnV6eicgbnVtT2N0YXZlcz0nMicgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPgoJPGZlQ29tcG9zaXRlIGluPSdTb3VyY2VHcmFwaGljJyBpbjI9J2Z1enonIG9wZXJhdG9yPSdhcml0aG1ldGljJyBrMT0nMCcgazI9JzEnIGszPSctNzMnIGs0PScuMDEnIC8+CjwvZmlsdGVyPgo8cmVjdCB3aWR0aD0nMTAyJScgaGVpZ2h0PScxMDIlJyBmaWxsPScjMDMwMzFhJy8+CjxyZWN0IHg9Jy0xJScgeT0nLTElJyB3aWR0aD0nMTAyJScgaGVpZ2h0PScxMDIlJyBmaWxsPScjZmZmZmZmJyBmaWx0ZXI9J3VybCgjbiknIG9wYWNpdHk9JzEnLz4KPHJlY3QgeD0nLTElJyB5PSctMSUnIHdpZHRoPScxMDIlJyBoZWlnaHQ9JzEwMiUnIGZpbGw9JyMwMzAzMWEnIGZpbHRlcj0ndXJsKCNpKScgb3BhY2l0eT0nMScvPgo8L3N2Zz4=');
`
);
const StyledProviderWrapper = styled.div(
	({ theme: { colors } }) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    padding: 64px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(7px);
    position: absolute;
    z-index: 1;
`
);
const StyledH1 = styled.h1(
	({ theme: { colors } }) => `
    color: ${colors.white};
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
`
);
const StyledH4 = styled.h4(
	({ theme: { colors } }) => `
    color: ${colors.white};
    padding: 0;
    margin: 0;
`
);

const StyledRocketWrapper = styled(motion.div)`
	position: absolute;
	z-index: 0;
	width: 250px;
	max-width: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const StyledGoogleLogo = styled.img`
	width: 150px;
	margin: 0 0 0 16px;
`;
const StyledImage = styled(motion.img)`
	width: 250px;
	max-width: 300px;
`;
const StyledFlameWrapper = styled(motion.div)`
	position: relative;
	width: 200px;
	max-width: 300px;
	display: flex;
	justify-content: space-around;
`;
const StyledFlame = styled(motion.div)(
	(props) => `
    position: relative;
    z-index: -1;
	width: ${props.size};
	height: ${props.size};
	background: rgba(255,192,87,0.9);
    box-shadow: 0px 1px 32px 13px rgba(255,192,87,0.9);
	border-radius: 100%;
`
);
