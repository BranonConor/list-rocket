import Head from 'next/head';
import { ProductNav } from '../navbars/ProductNav';
import styled from 'styled-components';
import { Footer } from '../Footer';
import { PopupButton } from '@typeform/embed-react';
import styles from './DashLayout.module.css';

interface DashLayoutProps {
	isWorkspace?: boolean;
	children?: React.ReactNode;
}

export const DashLayout: React.FC<DashLayoutProps> = ({
	children,
	isWorkspace = false,
}) => {
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
					content='https://www.listrocket.app/graphics/list-items.svg'
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

			{!isWorkspace && (
				<PopupButton id='l5g8afqA' className={styles.TypeformButton}>
					👋
				</PopupButton>
			)}
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
	position: relative;
	z-index: 1000;

	@media only screen and (max-width: 768px) {
		width: 100%;
		height: 56px;
		position: fixed;
		bottom: 0;
	}
`;
const StyledContainer = styled.div`
	width: 100%;
	height: 100%;
	max-height: 100%;
	overflow: hidden;
	display: flex;
`;
const StyledMainSection = styled.div`
	width: calc(100% - 75px);
	height: 100%;
	padding: 32px;
	margin-bottom: 41px;
	box-sizing: border-box;
	background: none;

	@media only screen and (max-width: 768px) {
		width: 100%;
		padding: 16px;
		margin-bottom: 64px;
	}
`;
