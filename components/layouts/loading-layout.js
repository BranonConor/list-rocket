import Head from 'next/head';
import styled from 'styled-components';

export const siteTitle = 'A productivity tool for streamlining events';

const WebLayout = ({ children }) => {
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
			<StyledMainSection>{children}</StyledMainSection>
		</StyledLayout>
	);
};

export default WebLayout;

const StyledLayout = styled.div`
	width: 100%;
	box-sizing: border-box;
`;
const StyledMainSection = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
`;
