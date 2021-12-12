import StyledProvider from '../components/providers/StyleProvider';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session}>
			<StyledProvider>
				<Component {...pageProps} />
			</StyledProvider>
		</SessionProvider>
	);
};

export default App;
