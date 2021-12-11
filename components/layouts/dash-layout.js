import Footer from '../footer';
import Head from 'next/head';
import Sidebar from '../navbars/sidebar';
import styled from 'styled-components';

export const siteTitle = 'A productivity tool for streamlining events';

const DashLayout = ({ children }) => {
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
					<Sidebar />
				</StyledHeader>
				<StyledMainSection>
					{children}
					<Footer />
				</StyledMainSection>
			</StyledContainer>
		</StyledWrapper>
	);
};

export default DashLayout;

const StyledWrapper = styled.div`
	width: 100%;
	box-sizing: border-box;
	color: white;
`;
const StyledHeader = styled.header`
	width: 75px;
	height: 100%;
`;
const StyledContainer = styled.div`
	width: 100%;
	height: 100vh;
`;
const StyledMainSection = styled.div`
	position: relative;
	width: calc(100% - 75px);
	height: 100%;
	overflow-y: scroll;
	padding: 16px;
	box-sizing: border-box;
`;
