import styled from 'styled-components';
import Image from 'next/image';
import { Text } from '../typography/Text';

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
	isLoading?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
	variant,
	content,
	icon,
	type = 'button',
	margin,
	className,
	disabled,
	isLoading = false,
	...otherProps
}: Props) => {
	return (
		<StyledButton
			disabled={disabled}
			variant={variant}
			type={type}
			margin={margin}
			isLoading={isLoading}
			className={className}
			{...otherProps}>
			{icon && <Image src={icon} alt='' width='30' height='30' />}
			{content}
			{isLoading && (
				<StyledText variant='overline' aria-label='loading'>
					...
				</StyledText>
			)}
		</StyledButton>
	);
};
interface StyleProps {
	variant: 'small' | 'large' | 'fullSmall' | 'fullLarge';
	margin?: string;
	disabled?: boolean;
	isLoading?: boolean;
}
const StyledButton = styled.button<StyleProps>(
	({
		variant,
		isLoading,
		margin,
		disabled,
		theme: { colors, typography },
	}) => `
	position: relative;
	min-width: ${BUTTON_WIDTH_VARIANTS[variant]};
	height: 40px;
	background: ${disabled ? colors.button.disabledBg : colors.button.defaultBg};
	padding: ${BUTTON_PADDING_VARIANTS[variant]};
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	border: none;
	color: ${isLoading ? 'transparent' : colors.white};
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
	cursor: ${disabled ? 'not-allowed' : 'pointer'};

	&:hover {
		background: ${disabled ? colors.button.disabledBg : colors.button.hoverBg};
	}
`
);
const StyledText = styled(Text)`
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	width: 100%;
	height: 100%;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
`;
