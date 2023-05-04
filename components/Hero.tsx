import { PrimaryButton } from './buttons/PrimaryButton';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Title } from './typography/Title';
import { Text } from './typography/Text';
import { motion } from 'framer-motion';

export const Hero = () => {
	const router = useRouter();

	const handleSignIn = () => {
		router.push('/api/auth/signin');
	};

	return (
		<StyledHeroSection>
			<StyledContent>
				<StyledH1 variant='heading1'>
					Plan it together, manage it better.
				</StyledH1>
				<StyledText variant='body1'>
					ListRocket is a simplified event planning tool for
					bootstrapping every-day events.
				</StyledText>
				<PrimaryButton
					variant='large'
					content='Get started!'
					onClick={handleSignIn}
				/>
			</StyledContent>
			<StyledGraphicWrapper>
				<StyledGraphic
					src='/graphics/hero.svg'
					alt=''
					draggable={false}
				/>
			</StyledGraphicWrapper>
		</StyledHeroSection>
	);
};

const StyledHeroSection = styled.div`
	padding: 128px 32px;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 32px;
	overflow: hidden;

	@media only screen and (max-width: 1200px) {
		grid-template-columns: 1.5fr 1fr;
	}
	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
		padding: 64px 16px;
		height: 600px;
	}

	background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nNjAwJyBoZWlnaHQ9JzYwMCcgdmlld0JveD0nMCAwIDE1MCAxNTAnPgo8ZmlsdGVyIGlkPSdpJyB4PScwJyB5PScwJz4KCTxmZUNvbG9yTWF0cml4IHR5cGU9J21hdHJpeCcgdmFsdWVzPScxIDAgMCAwIDAgIDAgMSAwIDAgMCAgMCAwIDEgMCAwICAwIDAgMCAwIDAnIC8+CjwvZmlsdGVyPgo8ZmlsdGVyIGlkPSduJyB4PScwJyB5PScwJz4KCTxmZVR1cmJ1bGVuY2UgdHlwZT0ndHVyYnVsZW5jZScgYmFzZUZyZXF1ZW5jeT0nLjcnIHJlc3VsdD0nZnV6eicgbnVtT2N0YXZlcz0nMicgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPgoJPGZlQ29tcG9zaXRlIGluPSdTb3VyY2VHcmFwaGljJyBpbjI9J2Z1enonIG9wZXJhdG9yPSdhcml0aG1ldGljJyBrMT0nMCcgazI9JzEnIGszPSctNzMnIGs0PScuMDEnIC8+CjwvZmlsdGVyPgo8cmVjdCB3aWR0aD0nMTAyJScgaGVpZ2h0PScxMDIlJyBmaWxsPScjMDMwMzFhJy8+CjxyZWN0IHg9Jy0xJScgeT0nLTElJyB3aWR0aD0nMTAyJScgaGVpZ2h0PScxMDIlJyBmaWxsPScjZmZmZmZmJyBmaWx0ZXI9J3VybCgjbiknIG9wYWNpdHk9JzEnLz4KPHJlY3QgeD0nLTElJyB5PSctMSUnIHdpZHRoPScxMDIlJyBoZWlnaHQ9JzEwMiUnIGZpbGw9JyMwMzAzMWEnIGZpbHRlcj0ndXJsKCNpKScgb3BhY2l0eT0nMScvPgo8L3N2Zz4=');
`;
const StyledContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 32px;
	box-sizing: border-box;

	@media only screen and (max-width: 1200px) {
		padding: 16px;
	}
	@media only screen and (max-width: 600px) {
		padding: 0;
	}
`;
const StyledH1 = styled(Title)`
	margin: 16px 0;
	padding: 0;

	color: white;
`;
const StyledText = styled(Text)`
	margin: 0 0 32px 0;
	padding: 0;

	color: white;
`;
const StyledGraphicWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	position: relative;
`;
const StyledGraphic = styled.img`
	width: 90%;
	position: absolute;
	bottom: -150px;

	@media only screen and (max-width: 1200px) {
		width: 130%;
	}
	@media only screen and (max-width: 768px) {
		width: 50%;
		bottom: -80px;
		right: 32px;
	}
	@media only screen and (max-width: 600px) {
		width: 70%;
	}
`;
