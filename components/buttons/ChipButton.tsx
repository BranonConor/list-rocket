import styled from 'styled-components';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	content: string;
	icon?: string;
	isActive: boolean;
}

export const ChipButton: React.FC<Props> = (props) => {
	const { content, icon, isActive, ...otherProps } = props;

	return (
		<StyledChip isActive={isActive} {...otherProps}>
			{icon && <img src={icon} alt='' />}
			{content}
		</StyledChip>
	);
};

interface StyleProps {
	isActive: boolean;
}
const StyledChip = styled.a<StyleProps>(
	({ isActive, theme: { colors, typography } }) => `
	width: auto;
	height: auto;
	padding: 4px 16px;
	border-radius: 20px;
	border: 2px solid ${colors.chip.border};
	color: ${colors.chip.text};
	background: ${isActive ? colors.chip.activeBg : colors.chip.defaultBg};
	font-family: ${typography.font.subtitle2};
	font-size: ${typography.size.subtitle2};
	letter-spacing: ${typography.letterSpacing.subtitle2};
	font-weight: ${typography.weight.subtitle2};

	&:hover {
		cursor: pointer;
		background: ${colors.chip.hoverBg};
	}
`
);
