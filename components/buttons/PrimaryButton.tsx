import styled from 'styled-components';

export enum BUTTON_VARIANTS {
	'full' = '100%',
	'large' = '130px',
	'small' = '100px',
}
interface Props {
	download: boolean;
	onClick: () => void;
	variant: 'full' | 'large' | 'small';
	content: string;
	icon: string;
}

export const PrimaryButton: React.FC<Props> = ({
	onClick,
	variant,
	content,
	icon,
}: Props) => {
	const handleClick = (e) => {
		onClick ? onClick() : null;
	};
	return (
		<StyledButton onClick={handleClick} variant={variant}>
			{icon && <img src={icon} alt='' width='30' height='30' />}
			{content}
		</StyledButton>
	);
};
interface StyleProps {
	variant: 'full' | 'large' | 'small';
}
const StyledButton = styled.button<StyleProps>(
	({ variant, theme: { colors, typography } }) => `
	width: ${BUTTON_VARIANTS[variant]};
	minWidth: 100%;
	height: 40px;
	margin: 16px 0;
	background: ${colors.button.defaultBg};
	padding: 8px 16px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	border: none;
	color: ${colors.white};
	text-decoration: none;
	outline: none;
	transition: 0.10s ease all;
	font-family: ${typography.font.button};
	text-transform: ${typography.textTransform.button};
	font-size: ${typography.size.button};
	font-weight: ${typography.weight.button};
	line-height: ${typography.lineHeight.button};
	letter-spacing: ${typography.letterSpacing.button};
	
	&:hover {
		cursor: pointer;
		background: ${colors.button.hoverBg};
	}
`
);
