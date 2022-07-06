import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { colors } from './colors';

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
		black: colors.black,
		white: colors.white,
		bgLight: colors.rocketSteel,

		/* BUTTONS */
		button: {
			defaultBg: colors.stellar,
			hoverBg: colors.lightStellar,
		},

		bgRed: colors.siren,
		bgRedLight: colors.lightSiren,
		bgDark: colors.deepSpace,
		primaryGradient: colors.horizon,
		secondaryGradient: colors.atmosphere,

		/* FONT */
		bodyText: '#39303B',

		/* LINKS */
		linkText: 'white',

		/* BUTTON */
		buttonTextLight: 'white',
		buttonTextDark: 'black',
		buttonBorderLight: 'white',
		buttonBorderDark: 'black',

		menu: {
			linkHover: 'rgba(0,0,0, 0.15)',
			border: '#f2f2f2',
		},
	},
	shadows: {
		/* CARDS */
		standard: '0px 4px 6px rgba(0, 0, 0, 0.1)',
	},
};

const GlobalStyle = createGlobalStyle(
	({ theme: { colors } }) => `
  html {
    box-sizing: border-box;
    background: ${colors.white};
    margin: 0 auto;
    padding: 0;
	font-family: 'Poppins';
	font-weight: 300;
  }

  body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
	color: ${colors.bodyText};
  }

  h1, h2, h3 {
	font-family: 'Lalezar';
  }

  button {
	font-family: 'Poppins';
  }

  input {
	font-family: 'Poppins';

	&::placeholder {
		font-family: 'Poppins';
	}
  }
`
);
