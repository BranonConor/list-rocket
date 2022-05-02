import StyledProvider from '../components/providers/StyleProvider';
import { SessionProvider } from 'next-auth/react';
import { EventProvider } from '../contexts/EventContext';
import { UserProvider } from '../contexts/UserContext';
import { WorkspaceProvider } from '../contexts/WorkspaceContext';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session}>
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
	);
};

export default App;
