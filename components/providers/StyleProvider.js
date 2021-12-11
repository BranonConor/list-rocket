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
    font-family: 'Baloo Tamma 2';
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
		/* GENERAL */
		primary: '#fafafa',
		bgDark: 'black',

		/* FONT */
		bodyText: 'black',

		/* LINKS */
		linkText: 'white',

		/* BUTTON */
		buttonTextLight: 'white',
		buttonTextDark: 'black',
		buttonBorderLight: 'white',
		buttonBorderDark: 'black',

		/* MENU */
		menuLinkHover: 'rgba(250,250,250, 0.15)',
	},
};
