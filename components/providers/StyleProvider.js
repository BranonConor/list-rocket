import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { colors } from './colors.ts';
import {
	size,
	font,
	weight,
	lineHeight,
	letterSpacing,
	textTransform,
} from './typography.ts';

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

const GlobalStyle = createGlobalStyle(
	({ theme: { colors, typography } }) => `
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
		font-family: ${typography.font.body1};
		font-size: ${typography.size.body1};
		font-weight: ${typography.weight.body1};
		line-height: ${typography.lineHeight.body1};
		letter-spacing: ${typography.letterSpacing.body1};
	}

	h1 {
		font-family: ${typography.font.heading1};
		font-size: ${typography.size.heading1};
		font-weight: ${typography.weight.heading1};
		line-height: ${typography.lineHeight.heading1};
		letter-spacing: ${typography.letterSpacing.heading1};
		padding: 0;
		margin: 16px 0;
	}
	h2 {
		font-family: ${typography.font.heading2};
		font-size: ${typography.size.heading2};
		font-weight: ${typography.weight.heading2};
		line-height: ${typography.lineHeight.heading2};
		letter-spacing: ${typography.letterSpacing.heading2};
		padding: 0;
		margin: 16px 0;
	}
	h3 {
		font-family: ${typography.font.heading3};
		font-size: ${typography.size.heading3};
		font-weight: ${typography.weight.heading3};
		line-height: ${typography.lineHeight.heading3};
		letter-spacing: ${typography.letterSpacing.heading3};
		padding: 0;
		margin: 16px 0;
	}
	h4 {
		font-family: ${typography.font.heading4};
		font-size: ${typography.size.heading4};
		font-weight: ${typography.weight.heading4};
		line-height: ${typography.lineHeight.heading4};
		letter-spacing: ${typography.letterSpacing.heading4};
		padding: 0;
		margin: 8px 0;
	}
	h5 {
		font-family: ${typography.font.heading5};
		font-size: ${typography.size.heading5};
		font-weight: ${typography.weight.heading5};
		line-height: ${typography.lineHeight.heading5};
		letter-spacing: ${typography.letterSpacing.heading5};
		padding: 0;
		margin: 8px 0;
	}
	h6 {
		font-family: ${typography.font.heading6};
		font-size: ${typography.size.heading6};
		font-weight: ${typography.weight.heading6};
		line-height: ${typography.lineHeight.heading6};
		letter-spacing: ${typography.letterSpacing.heading6};
		padding: 0;
		margin: 8px 0;
	}

	// https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
	.Toastify__toast--info {
		background: ${colors.white};
		color: ${colors.font.body};
		font-family: ${typography.font.caption};
		font-size: ${typography.size.caption};
	}
	.Toastify__toast--success {
		background: ${colors.white};
		color: ${colors.font.body};
		font-family: ${typography.font.caption};
		font-size: ${typography.size.caption};
	}
	.Toastify__toast--warning {
		background: ${colors.white};
		color: ${colors.font.body};
		font-family: ${typography.font.caption};
		font-size: ${typography.size.caption};
	}
	.Toastify__toast--error {
		background: ${colors.white};
		color: ${colors.font.body};
		font-family: ${typography.font.caption};
		font-size: ${typography.size.caption};
	}
	.Toastify__progress-bar {
		background: ${colors.toast.progressBarBg};
	}
`
);
