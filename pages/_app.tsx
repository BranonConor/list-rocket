import StyledProvider from '../components/providers/StyleProvider';
import { SessionProvider } from 'next-auth/react';
import { EventProvider } from '../contexts/EventContext';
import { UserProvider } from '../contexts/UserContext';
import { WorkspaceProvider } from '../contexts/WorkspaceContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session}>
			<ToastContainer
				position='bottom-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
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
	);
};

export default App;
