import { Footer } from '../Footer';
import Head from 'next/head';
import { ProductNav } from '../navbars/ProductNav';
import styled from 'styled-components';

export const DashLayout = ({ children }) => {
	const siteTitle = 'A productivity tool for streamlining events';

	return (
		<StyledWrapper>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='A productivity tool for streamlining event planning.'
				/>
				<meta
					property='og:image'
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name='og:title' content={siteTitle} />
				<meta name='twitter:card' content='summary_large_image' />
			</Head>

			<StyledContainer>
				<StyledHeader>
					<ProductNav />
				</StyledHeader>
				<StyledMainSection>
					{children}
					<Footer />
				</StyledMainSection>
			</StyledContainer>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	width: 100%;
	box-sizing: border-box;
	background: none;
`;
const StyledHeader = styled.header`
	width: 75px;
	height: 100%;

	@media only screen and (max-width: 768px) {
		width: 100%;
		height: 64px;
		position: fixed;
		bottom: 0;
		z-index: 1000;
	}
`;
const StyledContainer = styled.div`
	width: 100%;
	height: 100vh;
	overflow: auto;
	display: flex;
`;
const StyledMainSection = styled.div`
	position: relative;
	width: calc(100% - 75px);
	height: 100%;
	overflow-y: scroll;
	padding: 32px;
	box-sizing: border-box;
	background: none;

	@media only screen and (max-width: 768px) {
		width: 100%;
		padding: 16px 16px 80px 16px;
	}
`;
