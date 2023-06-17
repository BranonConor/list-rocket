import Head from 'next/head';
import { WebNav } from '../navbars/WebNav';
import styled from 'styled-components';
import { Title } from '../typography/Title';
import Link from 'next/link';
import { Text } from '../typography/Text';

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
				<StyledMainSection>
					<StyledWrapper>{children}</StyledWrapper>
				</StyledMainSection>

				<StyledWebFooter>
					<StyledWrapper>
						<StyledGrid>
							<StyledColumn>
								<StyledLink href='https://liftoff-tech.vercel.app'>
									<a
										target='_blank'
										rel='noopener noreferrer'>
										<StyledLogo
											src='/icons/liftoff-logo-light.svg'
											alt='Liftoff Technologies, LLC'
										/>
									</a>
								</StyledLink>
								<Text variant='body2'>App by LIFTOFF</Text>
							</StyledColumn>
							<StyledColumn>
								<StyledTitle variant='heading4'>
									Company
								</StyledTitle>
								<Link href='/'>LIFTOFF</Link>
							</StyledColumn>
							<StyledColumn>
								<StyledTitle variant='heading4'>
									Resources
								</StyledTitle>
								<Link href='https://cp7p1hyg8bp.typeform.com/to/l5g8afqA'>
									🤝 Give Feedback
								</Link>
							</StyledColumn>
							<StyledColumn>
								<StyledTitle variant='heading4'>
									Use Cases
								</StyledTitle>
								<Link href='/'>👀 Coming Soon!</Link>
							</StyledColumn>
						</StyledGrid>
					</StyledWrapper>
				</StyledWebFooter>
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
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;
const StyledMainSection = styled.div`
	position: relative;
	width: 100%;
	min-height: 100vh;
	padding: 75px 0 0 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;
const StyledHeader = styled.header``;
const StyledWrapper = styled.div`
	width: 100%;
	max-width: 1440px;
	padding: 32px;
	box-sizing: border-box;
	@media only screen and (max-width: 768px) {
		padding: 16px;
	}
`;
const StyledWebFooter = styled.footer(
	({ theme: { colors } }) => `
	background: ${colors.black};
	display: flex;
	justify-content: center;

	@media only screen and (max-width: 768px) {
		padding: 16px 0;
	}
`
);
const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;
const StyledColumn = styled.div(
	({ theme: { colors } }) => `
	color: white;
	border-right: 1px dashed ${colors.font.body2};
	padding: 0 16px 16px 16px;

	a {
		color: white;
	}

	@media only screen and (max-width: 768px) {
		border-left: 1px dashed ${colors.font.body2};
		padding: 0 16px 32px 16px;
	}
`
);
const StyledLogo = styled.img`
	width: 70%;

	@media only screen and (max-width: 900px) {
		width: 100%;
	}
	@media only screen and (max-width: 768px) {
		max-width: 200px;
	}
`;
const StyledLink = styled(Link)`
	color: white;

	a {
		cursor: pointer;
	}
`;
const StyledTitle = styled(Title)`
	margin-top: 0;
`;
