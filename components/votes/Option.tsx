import styled from 'styled-components';
import { Text } from '../typography/Text';

interface IOptionProps {
	name: string;
	isMostVotedOption?: boolean;
	percentage?: number;
	isOpen?: boolean;
}

export const Option: React.FC<IOptionProps> = ({
	name,
	isMostVotedOption,
	percentage,
	isOpen,
}) => {
	return (
		<StyledWrapper isOpaque={!isOpen && !isMostVotedOption}>
			<StyledNameWrapper variant='body2'>
				<StyledIcon src='/icons/radio-unchecked.svg' />
				{name}
			</StyledNameWrapper>
			<StyledPercentageWrapper isMostVotedOption={isMostVotedOption}>
				{percentage}%
			</StyledPercentageWrapper>
			<StyledBar width={percentage} />
		</StyledWrapper>
	);
};
interface IStyledWrapperProps {
	isOpaque?: boolean;
}
const StyledWrapper = styled.div<IStyledWrapperProps>(
	({ isOpaque, theme: { colors } }) => `
	display: flex;
	justify-content: space-between;
	align-items: center;
    background: white;
    color: ${colors.bgDark};
    padding: 8px;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    height: 32px;
    position: relative;
    overflow: hidden;
	opacity: ${isOpaque ? '0.4' : '1'};

    &:last-of-type {
        margin-bottom: 0px;
    }
`
);
const StyledIcon = styled.img`
	margin-right: 8px;
`;
interface IStyledPercentageWrapperProps {
	isMostVotedOption: boolean;
}
const StyledPercentageWrapper = styled.div<IStyledPercentageWrapperProps>(
	({ isMostVotedOption, theme: { colors, shadows } }) => `
	display: flex;
	align-items: center;
	justify-content: flex-end;
    background: ${isMostVotedOption ? colors.tertiaryGradient : 'white'};
    color: ${isMostVotedOption ? 'white' : colors.bgDark};
    box-shadow: ${shadows.standard};
    height: 20px;
    border-radius: 8px;
    padding: 4px 6px;
    box-sizing: border-box;
    font-size: 13px;
    position: relative;
    z-index: 1;

`
);
const StyledNameWrapper = styled(Text)`
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;
`;
interface IStyledBarProps {
	width: number;
}
const StyledBar = styled.div<IStyledBarProps>(
	({ width, theme: { colors } }) => `
	position: absolute;
	left: 0;
	top: 0;
    height: 100%;
    width: ${width}%;
    background: ${colors.chip.defaultBg};
    z-index: 0;
    border-radius: 10px;
`
);
