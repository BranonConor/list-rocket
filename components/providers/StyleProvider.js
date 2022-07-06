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
		black: colors.black,
		white: colors.white,
		bgLight: colors.rocketSteel,
		primaryGradient: colors.horizon,
		secondaryGradient: colors.atmosphere,
		button: {
			defaultBg: colors.stellar,
			hoverBg: colors.lightStellar,
			textLight: colors.white,
			textDark: colors.black,
			borderLight: colors.white,
			borderDark: colors.black,
			bgRed: colors.siren,
			bgRedLight: colors.lightSiren,
		},
		chip: {
			defaultBg: colors.deepSpace,
			hoverBg: colors.stellar,
			activeBg: colors.stellar,
		},
		font: {
			body: colors.smoke,
		},
		link: {
			default: colors.white,
		},
		menu: {
			border: colors.rocketSteel,
		},
	},
	shadows: {
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
	color: ${colors.font.body};
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
