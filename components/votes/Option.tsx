import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface IOptionProps {
	name: string;
	isMostVotedOption?: boolean;
	percentage?: number;
	isOpen?: boolean;
	currentValue?: string;
	setCurrentValue?: Dispatch<SetStateAction<string>>;
}

export const Option: React.FC<IOptionProps> = ({
	name,
	isMostVotedOption,
	percentage,
	isOpen,
	currentValue,
	setCurrentValue,
}) => {
	const isDisabled = !isOpen;
	const handleClick = (e) => {
		if (isDisabled) {
			return;
		} else {
			setCurrentValue(e.target.value);
		}
	};

	return (
		<StyledWrapper
			isDisabled={isDisabled}
			onClick={handleClick}
			isMostVotedOption={isMostVotedOption}>
			<StyledLabel>
				<StyledInput
					type='radio'
					name={name}
					value={name.toLowerCase()}
					checked={currentValue === name.toLowerCase()}
					isDisabled={isDisabled}
					disabled={isDisabled}
				/>
				{name}
			</StyledLabel>

			<StyledPercentageWrapper
				isDisabled={isDisabled}
				isMostVotedOption={isMostVotedOption}>
				{percentage}%
			</StyledPercentageWrapper>
			<StyledBar width={percentage} />
		</StyledWrapper>
	);
};
interface IStyledWrapperProps {
	isDisabled?: boolean;
	isMostVotedOption?: boolean;
}
const StyledWrapper = styled.div<IStyledWrapperProps>(
	({ isDisabled, isMostVotedOption, theme: { colors, shadows } }) => `
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
	opacity: ${isDisabled && !isMostVotedOption ? '0.4' : '1'};
	box-shadow: ${isDisabled && isMostVotedOption ? shadows.standard : 'none'};
	cursor: ${isDisabled ? 'not-allowed' : 'pointer'};

    &:last-of-type {
        margin-bottom: 0px;
    }
`
);
interface IStyledPercentageWrapperProps {
	isMostVotedOption: boolean;
	isDisabled?: boolean;
}
const StyledPercentageWrapper = styled.div<IStyledPercentageWrapperProps>(
	({ isMostVotedOption, isDisabled, theme: { colors, shadows } }) => `
	display: flex;
	align-items: center;
	justify-content: flex-end;
    background: ${
		isMostVotedOption
			? isDisabled
				? colors.bgDark
				: colors.tertiaryGradient
			: 'white'
	};
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
    border-radius: 8px;
`
);
const StyledLabel = styled.label(
	({ theme: { typography } }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 1;
	font-size: ${typography.size.body2};
`
);

interface IStyledInputProps {
	isDisabled: boolean;
}
const StyledInput = styled(motion.input)<IStyledInputProps>(
	({ isDisabled, theme: { colors } }) => `
	appearance: none;
  	background-color: transparent;
	margin: 0 8px 0 4px;
	font: inherit;
	color: ${colors.bgDark};
	width: 16px;
	height: 16px;
	border: 2px solid currentColor;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: ${isDisabled ? 'not-allowed' : 'pointer'};

	&::before {
		display: inline-block;
		content: "";
		width: 8px;
		height: 8px;
		border-radius: 50%;
		transform: scale(0);
		transition: 0.1s ease all;
		background-color: ${colors.bgDark};
	}

	&:checked::before {
		transform: scale(1);
	} 
`
);
