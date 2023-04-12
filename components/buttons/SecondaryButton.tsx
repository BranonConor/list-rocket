import styled from 'styled-components';
import Image from 'next/image';

export enum BUTTON_WIDTH_VARIANTS {
	'small' = '100px',
	'large' = '130px',
	'fullSmall' = '100%',
	'fullLarge' = '100%',
}
export enum BUTTON_PADDING_VARIANTS {
	'small' = '8px 16px',
	'large' = '24px 32px',
	'fullSmall' = '8px 16px',
	'fullLarge' = '24px 32px',
}
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	download?: boolean;
	variant: 'small' | 'large' | 'fullSmall' | 'fullLarge';
	content: string;
	icon?: string;
	type?: 'submit' | 'reset' | 'button';
	margin?: string;
	className?: string;
}

export const SecondaryButton: React.FC<Props> = ({
	variant,
	content,
	icon,
	type = 'button',
	margin,
	className,
	...otherProps
}: Props) => {
	return (
		<StyledButton
			{...otherProps}
			variant={variant}
			type={type}
			margin={margin}
			className={className}>
			{icon && <Image src={icon} alt='' width='30' height='30' />}
			{content}
		</StyledButton>
	);
};
interface StyleProps {
	variant: 'small' | 'large' | 'fullSmall' | 'fullLarge';
	margin?: string;
}
const StyledButton = styled.button<StyleProps>(
	({ variant, margin, theme: { colors, typography } }) => `
	min-width: ${BUTTON_WIDTH_VARIANTS[variant]};
	height: 40px;
	background: ${colors.button.secondary.defaultBg};
	padding: ${BUTTON_PADDING_VARIANTS[variant]};
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	border: 2px solid ${colors.button.secondary.borderDark};
	color: ${colors.button.secondary.textDark};
	text-decoration: none;
	outline: none;
	transition: 0.10s ease all;
	font-family: ${typography.font.button};
	text-transform: ${typography.textTransform.button};
	font-size: ${typography.size.button};
	font-weight: ${typography.weight.button};
	line-height: ${typography.lineHeight.button};
	letter-spacing: ${typography.letterSpacing.button};
	margin: ${margin};
	
	&:hover {
		cursor: pointer;
		background: ${colors.button.secondary.hoverBg};
		color: ${colors.button.secondary.textLight};

	}
`
);
