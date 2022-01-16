import { motion } from 'framer-motion';
import { getProviders, signIn, getSession } from 'next-auth/react';
import styled from 'styled-components';
import Button from '../components/buttons/Button';

export default function SignIn({ providers }) {
	return (
		<StyledWrapper>
			{Object.values(providers).map((provider) => (
				<StyledProviderWrapper key={provider.name}>
					<StyledH1>Sign in with {provider.name}</StyledH1>
					<StyledH4>Why complicate things? ;)</StyledH4>
					<Button
						content='Sign in with Google'
						onClick={() => signIn(provider.id)}
					/>
				</StyledProviderWrapper>
			))}
			<StyledImage src='/icons/rocket.svg' />
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
    backdrop-filter: blur(20px);
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
`
);
const StyledH4 = styled.h4(
	({ theme: { colors } }) => `
    color: ${colors.white};
    padding: 0;
    margin: 0;
`
);
const StyledImage = styled(motion.img)`
	position: absolute;
	z-index: 0;
	width: 200px;
	max-width: 300px;
`;
