import styled from 'styled-components';

interface IProps {
	handleChange: () => void;
	checked: boolean;
}

export const ToggleSwitch: React.FC<IProps> = (props) => {
	const { handleChange, checked } = props;

	return (
		<StyledSwitchWrapper>
			<StyledLabel
				htmlFor='anonymous-toggle'
				onClick={handleChange}
				checked={checked}
				aria-label={checked ? 'on' : 'off'}>
				<StyledSwitch checked={checked} />
			</StyledLabel>
			<StyledInput
				type='checkbox'
				name='anonymous-toggle'
				checked={checked}
				onChange={handleChange}
			/>
		</StyledSwitchWrapper>
	);
};

const StyledSwitchWrapper = styled.div(
	({ theme: { typography } }) => `
	display: flex;
	align-items: center;
	text-transform: ${typography.textTransform.overline};
	font-size: ${typography.size.overline};

	@media only screen and (max-width: 450px) {
		& > span {
			display: none;
		}
	}
`
);
const StyledInput = styled.input`
	display: none;
`;
interface StyledSpanProps {
	checked: boolean;
}
const StyledLabel = styled.label<StyledSpanProps>(
	({ checked, theme: { colors } }) => `
	position: relative;
	display: block;
	min-width: 40px;
	max-width: 40px;
	height: 16px;
	border: 2px solid ${checked ? colors.success.text : colors.error.text};
	cursor: pointer;
	border-radius: 20px;
	background: ${checked ? colors.success.bg : colors.error.bg};
	padding: 2px;
    transition: 0.15s ease all;
`
);
const StyledSwitch = styled.span<StyledSpanProps>(
	({ checked, theme: { colors } }) => `
	display: block;
	width: 16px;
	border-radius: 20px;
	height: 16px;
	background: ${checked ? colors.bgDark : colors.bgDark};
	position: relative;
	left: 1px;
	top: 0px;
	z-index: 2;
    transform: translateX(${checked ? '22px' : '0'});
    transition: 0.15s ease all;
`
);
