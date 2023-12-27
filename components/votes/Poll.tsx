import styled from 'styled-components';
import { Title } from '../typography/Title';
import { ProfilePhoto } from '../ProfilePhoto';
import { Text } from '../typography/Text';
import { Option } from './Option';
import { IOption } from '../../contexts/types';
import React, { useState } from 'react';

interface IPollProps {
	title: string;
	creator: string;
	image?: string;
	isOpen?: boolean;
	options: IOption[];
}

export const Poll: React.FC<IPollProps> = ({
	title,
	image,
	creator,
	isOpen = false,
	options,
}) => {
	const [currentValue, setCurrentValue] = useState<null | string>(null);

	return (
		<StyledFormWrapper>
			<legend>
				<Title variant='heading3'>{title}</Title>
			</legend>
			<StyledDetailsWrapper>
				<StyledCreatorLabel>
					<ProfilePhoto
						photo={image}
						dimensions='24px'
						hasBoxShadow
					/>
					<StyledText variant='body2'>{creator}</StyledText>
				</StyledCreatorLabel>
				<StyledStatusChip isOpen={isOpen}>
					<Text variant='overline'>{isOpen ? 'OPEN' : 'CLOSED'}</Text>
				</StyledStatusChip>
			</StyledDetailsWrapper>
			<StyledOptionsGrid>
				{options.map((option) => (
					<React.Fragment key={option.name}>
						<Option
							name={option.name}
							percentage={option.percentage}
							isMostVotedOption={option.isMostVotedOption}
							isOpen={isOpen}
							currentValue={currentValue}
							setCurrentValue={setCurrentValue}
						/>
					</React.Fragment>
				))}
			</StyledOptionsGrid>
		</StyledFormWrapper>
	);
};

const StyledFormWrapper = styled.form(
	({ theme: { colors } }) => `
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
    background: ${colors.bgLight};
    border-radius: 10px;
    padding: 16px;
    box-sizing: border-box;
`
);
const StyledCreatorLabel = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StyledText = styled(Text)`
	margin-left: 8px;
`;
const StyledOptionsGrid = styled.fieldset`
	border: none;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 16px;
	width: 100%;
	box-sizing: border-box;
	margin: 16px 0;
`;
interface IStyledStatusChipProps {
	isOpen: boolean;
}
const StyledStatusChip = styled.div<IStyledStatusChipProps>(
	({ isOpen, theme: { colors } }) => `
    height: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    background: ${isOpen ? colors.tertiaryGradient : colors.bgDark};
    color: white;
    border-radius: 8px;
`
);
const StyledDetailsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;