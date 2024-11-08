import { PrimaryButton } from '../buttons/PrimaryButton';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
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
					initial={{ opacity: 0, translateY: 20 }}
					animate={{ opacity: 1, translateY: 0 }}
					transition={{
						duration: 0.75,
						type: 'spring',
					}}
				/>
				<StyledListsGraphic
					src='/graphics/lists.svg'
					alt=''
					draggable={false}
					initial={{ opacity: 0, translateY: 50 }}
					animate={{ opacity: 1, translateY: 0 }}
					transition={{
						duration: 1,
						type: 'spring',
					}}
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
	border-radius: 20px;
	overflow: hidden;

	@media only screen and (max-width: 1200px) {
		grid-template-columns: 1.25fr 1fr;
	}
	@media only screen and (max-width: 990px) {
		grid-template-columns: 1fr;
		padding: 64px 16px;
		height: 800px;
		grid-template-rows: 0.5fr;
	}
	@media only screen and (max-width: 510px) {
		height: 600px;
	}
	@media only screen and (max-width: 430px) {
		padding: 32px 16px;
		grid-gap: 16px;
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
	@media only screen and (max-width: 990px) {
		padding: 0;
		align-items: center;
	}
`;
const StyledH1 = styled(Title)`
	margin: 16px 0;
	padding: 0;
	color: white;
	@media only screen and (max-width: 990px) {
		text-align: center;
	}
	@media only screen and (max-width: 768px) {
		max-width: 470px;
	}
`;
const StyledText = styled(Text)`
	margin: 0 0 32px 0;
	padding: 0;
	color: white;
	@media only screen and (max-width: 990px) {
		text-align: center;
	}
	@media only screen and (max-width: 768px) {
		max-width: 470px;
	}
`;
const StyledGraphicWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	position: relative;
`;
const StyledGraphic = styled(motion.img)`
	width: 90%;
	position: absolute;
	bottom: -150px;
	z-index: 1;

	@media only screen and (max-width: 1200px) {
		width: 130%;
	}
	@media only screen and (max-width: 990px) {
		width: 65%;
		bottom: -80px;
		left: 15%;
	}
	@media only screen and (max-width: 600px) {
		width: 70%;
		left: 10%;
	}
	@media only screen and (max-width: 430px) {
		width: 80%;
		left: 5%;
		bottom: -32px;
	}
`;
const StyledListsGraphic = styled(motion.img)`
	position: absolute;
	top: -100px;
	right: 32px;
	z-index: 0;

	@media only screen and (max-width: 990px) {
		top: 0;
		width: 50%;
		left: 25%;
	}
	@media only screen and (max-width: 600px) {
		width: 55%;
		top: 50px;
		left: 22%;
	}
	@media only screen and (max-width: 510px) {
		width: 50%;
		left: 25%;
	}
	@media only screen and (max-width: 430px) {
		top: 32px;
	}
`;
