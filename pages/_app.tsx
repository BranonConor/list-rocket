import StyledProvider from '../components/providers/StyleProvider';
import { SessionProvider } from 'next-auth/react';
import { EventProvider } from '../contexts/EventContext';
import { UserProvider } from '../contexts/UserContext';
import { WorkspaceProvider } from '../contexts/WorkspaceContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client (outside of App or you'll be in for a world of hurt and pointless debugging)
const queryClient = new QueryClient();

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};

		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

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
				<QueryClientProvider client={queryClient}>
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
									<ReactQueryDevtools initialIsOpen={false} />
								</WorkspaceProvider>
							</EventProvider>
						</UserProvider>
					</StyledProvider>
				</QueryClientProvider>
			</SessionProvider>
		</>
	);
};

export default App;
