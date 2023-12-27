import styled from 'styled-components';
import { Title } from '../typography/Title';
import { ProfilePhoto } from '../ProfilePhoto';
import { Text } from '../typography/Text';
import { Option } from './Option';

interface IVoteBlockProps {
	title: string;
	creator: string;
	image?: string;
}

export const VoteBlock: React.FC<IVoteBlockProps> = ({
	title,
	image,
	creator,
}) => {
	return (
		<StyledWrapper>
			<Title variant='heading3'>{title}</Title>
			<StyledCreatorLabel>
				<ProfilePhoto photo={image} dimensions='24px' hasBoxShadow />
				<StyledText variant='body2'>{creator}</StyledText>
			</StyledCreatorLabel>
			<StyledOptionsGrid>
				<Option name='Option 1' percentage={20} />
				<Option name='Option 2' percentage={60} isMostVotedOption />
				<Option name='Option 3' percentage={20} />
			</StyledOptionsGrid>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div(
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
const StyledOptionsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 16px;
	width: 100%;
	box-sizing: border-box;
	margin: 16px 0;
`;
