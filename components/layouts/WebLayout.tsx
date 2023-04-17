import Head from 'next/head';
import { WebNav } from '../navbars/WebNav';
import styled from 'styled-components';

export const WebLayout = ({ children }) => {
	const siteTitle = 'A productivity tool for streamlining events';

	return (
		<StyledLayout>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='A productivity tool for streamlining events'
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
					<WebNav />
				</StyledHeader>
				<StyledMainSection>{children}</StyledMainSection>
			</StyledContainer>
		</StyledLayout>
	);
};

const StyledLayout = styled.div`
	width: 100%;
	box-sizing: border-box;
`;
const StyledContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;
const StyledMainSection = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
	padding: 75px 0 0 0;
	box-sizing: border-box;
`;
const StyledHeader = styled.header``;
