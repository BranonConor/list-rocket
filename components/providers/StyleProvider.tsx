import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { colors } from './colors';
import {
	size,
	font,
	weight,
	lineHeight,
	letterSpacing,
	textTransform,
} from './typography';

const StyleProvider = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	);
};

export default StyleProvider;

export const theme = {
	colors: {
		black: colors.black,
		white: colors.white,
		bgLight: colors.rocketSteel,
		bgDark: colors.deepSpace,
		primaryGradient: colors.horizon,
		secondaryGradient: colors.atmosphere,
		tertiaryGradient: colors.flame,
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
			defaultBg: colors.metallicBlue,
			hoverBg: colors.lightStellar,
			activeBg: colors.lightStellar,
			border: colors.deepSpace,
			text: colors.deepSpace,
		},
		card: {
			darkBg: colors.deepSpace,
		},
		font: {
			body: colors.smoke,
		},
		link: {
			default: colors.deepSpace,
			hover: colors.lightStellar,
		},
		menu: {
			border: colors.rocketSteel,
		},
		toast: {
			progressBarBg: colors.flame,
		},
	},
	shadows: {
		standard: '0px 4px 6px rgba(0, 0, 0, 0.1)',
	},
	typography: {
		size: size,
		font: font,
		weight: weight,
		lineHeight: lineHeight,
		letterSpacing: letterSpacing,
		textTransform: textTransform,
	},
};

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		background: ${theme.colors.white};
		margin: 0 auto;
		padding: 0;
		font-family: 'Poppins';
		font-weight: 300;
	}

	body {
		min-height: 100vh;
		padding: 0;
		margin: 0;
		color: ${theme.colors.font.body};
		font-family: ${theme.typography.font.body1};
		font-size: ${theme.typography.size.body1};
		font-weight: ${theme.typography.weight.body1};
		line-height: ${theme.typography.lineHeight.body1};
		letter-spacing: ${theme.typography.letterSpacing.body1};
	}

	h1 {
		font-family: ${theme.typography.font.heading1};
		font-size: ${theme.typography.size.heading1};
		font-weight: ${theme.typography.weight.heading1};
		line-height: ${theme.typography.lineHeight.heading1};
		letter-spacing: ${theme.typography.letterSpacing.heading1};
		padding: 0;
		margin: 16px 0;
	}
	h2 {
		font-family: ${theme.typography.font.heading2};
		font-size: ${theme.typography.size.heading2};
		font-weight: ${theme.typography.weight.heading2};
		line-height: ${theme.typography.lineHeight.heading2};
		letter-spacing: ${theme.typography.letterSpacing.heading2};
		padding: 0;
		margin: 16px 0;
	}
	h3 {
		font-family: ${theme.typography.font.heading3};
		font-size: ${theme.typography.size.heading3};
		font-weight: ${theme.typography.weight.heading3};
		line-height: ${theme.typography.lineHeight.heading3};
		letter-spacing: ${theme.typography.letterSpacing.heading3};
		padding: 0;
		margin: 16px 0;
	}
	h4 {
		font-family: ${theme.typography.font.heading4};
		font-size: ${theme.typography.size.heading4};
		font-weight: ${theme.typography.weight.heading4};
		line-height: ${theme.typography.lineHeight.heading4};
		letter-spacing: ${theme.typography.letterSpacing.heading4};
		padding: 0;
		margin: 8px 0;
	}
	h5 {
		font-family: ${theme.typography.font.heading5};
		font-size: ${theme.typography.size.heading5};
		font-weight: ${theme.typography.weight.heading5};
		line-height: ${theme.typography.lineHeight.heading5};
		letter-spacing: ${theme.typography.letterSpacing.heading5};
		padding: 0;
		margin: 8px 0;
	}
	h6 {
		font-family: ${theme.typography.font.heading6};
		font-size: ${theme.typography.size.heading6};
		font-weight: ${theme.typography.weight.heading6};
		line-height: ${theme.typography.lineHeight.heading6};
		letter-spacing: ${theme.typography.letterSpacing.heading6};
		padding: 0;
		margin: 8px 0;
	}

	// https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
	.Toastify__toast--info {
		background: ${theme.colors.white};
		color: ${theme.colors.font.body};
		font-family: ${theme.typography.font.caption};
		font-size: ${theme.typography.size.caption};
	}
	.Toastify__toast--success {
		background: ${theme.colors.white};
		color: ${theme.colors.font.body};
		font-family: ${theme.typography.font.caption};
		font-size: ${theme.typography.size.caption};
	}
	.Toastify__toast--warning {
		background: ${theme.colors.white};
		color: ${theme.colors.font.body};
		font-family: ${theme.typography.font.caption};
		font-size: ${theme.typography.size.caption};
	}
	.Toastify__toast--error {
		background: ${theme.colors.white};
		color: ${theme.colors.font.body};
		font-family: ${theme.typography.font.caption};
		font-size: ${theme.typography.size.caption};
	}
	.Toastify__progress-bar {
		background: ${theme.colors.toast.progressBarBg};
	}
`;
