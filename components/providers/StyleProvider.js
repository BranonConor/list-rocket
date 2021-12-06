import { createGlobalStyle, ThemeProvider } from 'styled-components';

const StyleProvider = ({ children }) => {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</>
	);
};

export default StyleProvider;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    background: #00000;
    margin: 0 auto;
    padding: 0;
  }

  body {
    background-color: #fafafa;
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }
`;

const theme = {
	colors: {
		primary: '#fafafa',
	},
};
