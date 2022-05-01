import StyledProvider from '../components/providers/StyleProvider';
import { SessionProvider } from 'next-auth/react';
import { EventProvider } from '../contexts/EventContext';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session}>
			<StyledProvider>
				<EventProvider>
					<Component {...pageProps} />
				</EventProvider>
			</StyledProvider>
		</SessionProvider>
	);
};

export default App;
