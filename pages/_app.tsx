import StyledProvider from '../components/providers/StyleProvider';
import { SessionProvider } from 'next-auth/react';
import { EventProvider } from '../contexts/EventContext';
import { UserProvider } from '../contexts/UserContext';
import { WorkspaceProvider } from '../contexts/WorkspaceContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<>
			{/* ----- Vercel Analytics ----- */}
			<Analytics />

			{/* ----- Google Analytics ----- */}
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
				strategy='afterInteractive'
			/>
			<Script
				id='google-analytics'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}', {
							page_path: window.location.pathname,
						});
					`,
				}}
			/>

			{/* ----- App ----- */}
			<SessionProvider session={session}>
				<ToastContainer
					position='bottom-center'
					autoClose={4000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					limit={2}
				/>
				<StyledProvider>
					<UserProvider>
						<EventProvider>
							<WorkspaceProvider>
								<Component {...pageProps} />
							</WorkspaceProvider>
						</EventProvider>
					</UserProvider>
				</StyledProvider>
			</SessionProvider>
		</>
	);
};

export default App;
