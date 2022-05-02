import StyledProvider from '../components/providers/StyleProvider';
import { SessionProvider } from 'next-auth/react';
import { EventProvider } from '../contexts/EventContext';
import { UserContext, UserProvider } from '../contexts/UserContext';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session}>
			<StyledProvider>
				<UserProvider>
					<EventProvider>
						<Component {...pageProps} />
					</EventProvider>
				</UserProvider>
			</StyledProvider>
		</SessionProvider>
	);
};

export default App;
