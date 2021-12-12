import { createGlobalStyle, ThemeProvider } from 'styled-components';

const StyleProvider = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	);
};

export default StyleProvider;

const theme = {
	colors: {
		/* GENERAL */
		black: 'black',
		white: 'white',
		bgLight: '#f2f2f2',
		bgDark: '#071D3F',
		primaryGradient:
			'linear-gradient(180deg, #071D3F 54.69%, #0071A2 86.98%, #0092D1 99.99%, #00B2FF 100%)',
		secondaryGradient: 'linear-gradient(180deg, #56CCF2 0%, #AD00FF 100%)',

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
		menuLinkHover: 'rgba(0,0,0, 0.15)',
		menuBorder: '#f2f2f2',
	},
	shadows: {
		/* CARDS */
		standard: '0px 4px 6px rgba(101, 172, 194, 0.25)',
	},
};

const GlobalStyle = createGlobalStyle(
	({ theme: { colors } }) => `
  html {
    box-sizing: border-box;
    background: ${colors.white};
    margin: 0 auto;
    padding: 0;
    font-family: 'Baloo Tamma 2';
  }

  body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
	color: black;
  }
`
);
