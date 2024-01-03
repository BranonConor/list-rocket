import styled from 'styled-components';
import { Title } from '../typography/Title';
import { ProfilePhoto } from '../ProfilePhoto';
import { Text } from '../typography/Text';
import { Option } from './Option';
import { IUser } from '../../contexts/types';
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { UserContext } from '../../contexts/UserContext';
import { getVoteMap } from '../../helpers/getVoteMap';

interface IPollProps {
	id: string;
	title: string;
	creator: IUser;
	isOpen?: boolean;
	options: string[];
	userSelection?: string;
	votes?: { user: IUser; option: string }[];
}

export const Poll: React.FC<IPollProps> = ({
	id,
	title,
	creator,
	isOpen = false,
	options,
	userSelection = null,
	votes,
}) => {
	const { user } = useContext(UserContext);
	const [currentValue, setCurrentValue] = useState<null | string>(
		userSelection
	);

	const voteMap = getVoteMap(votes);

	const getOptions = (options, voteMap) => {
		let totalVotes = 0;
		options.forEach((option) => {
			totalVotes += voteMap[option]?.length || 0;
		});
		let mostVotes = 0;
		const reformattedOptions = options.map((option) => {
			const freq = voteMap[option]?.length || 0;
			mostVotes = Math.max(freq, mostVotes);
			const percentage = Math.ceil((freq / totalVotes) * 100);
			return {
				name: option,
				percentage: percentage ? percentage : 0,
				isMostVotedOption: mostVotes === freq && freq !== 0,
			};
		});
		return reformattedOptions;
	};
	const formattedOptions = getOptions(options, voteMap);

	return (
		<StyledFormWrapper
			initial={{
				opacity: 0.5,
			}}
			animate={{
				opacity: 1,
			}}
			transition={{
				duration: 0.5,
				type: 'spring',
			}}>
			<legend>
				<Title variant='heading3'>{title}</Title>
			</legend>
			<StyledDetailsWrapper>
				<StyledCreatorLabel>
					<ProfilePhoto
						photo={creator.image}
						dimensions='24px'
						hasBoxShadow
					/>
					<StyledText variant='body2'>{creator.name}</StyledText>
				</StyledCreatorLabel>
				<StyledStatusChip isOpen={isOpen}>
					<Text variant='overline'>{isOpen ? 'OPEN' : 'CLOSED'}</Text>
				</StyledStatusChip>
			</StyledDetailsWrapper>
			<StyledOptionsGrid>
				{formattedOptions.map((option) => {
					let isUserSelection = false;
					voteMap[option.name]?.forEach((voter) => {
						if (voter._id === user?._id) {
							isUserSelection = true;
						}
					});

					return (
						<React.Fragment key={option.name}>
							<Option
								pollId={id}
								name={option.name}
								percentage={option.percentage}
								isMostVotedOption={option.isMostVotedOption}
								isOpen={isOpen}
								currentValue={currentValue}
								setCurrentValue={setCurrentValue}
								isUserSelection={isUserSelection}
							/>
						</React.Fragment>
					);
				})}
			</StyledOptionsGrid>
		</StyledFormWrapper>
	);
};

const StyledFormWrapper = styled(motion.form)(
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
