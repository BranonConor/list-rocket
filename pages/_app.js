import StyledProvider from '../components/providers/StyleProvider';

const App = ({ Component, pageProps }) => {
	return (
		<StyledProvider>
			<Component {...pageProps} />
		</StyledProvider>
	);
};

export default App;
