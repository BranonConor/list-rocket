import styled from 'styled-components';
import { SectionContainer } from '../layouts/SectionContainer';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';

export const About = () => {
	return (
		<SectionContainer>
			<StyledContentWrapper>
				<StyledTitle variant='heading2'>
					Everything, everyone, all in one place.
				</StyledTitle>
				<StyledText variant='body1'>
					Planning something with friends and family is hard.
					Scattered to-do list apps or other disjointed solutions
					don&apos;t make it any easier.
				</StyledText>
				<Text variant='body1'>
					ListRocket combines traditional to-do lists with real-time
					collaborative group features, all in one space. Instead of
					trying to organize an event across group chats and random
					apps, why not work with everyone all in one workspace?
				</Text>
				<StyledImageWrapper>
					<StyledImage src='/assets/workspace.png' />
				</StyledImageWrapper>
			</StyledContentWrapper>
		</SectionContainer>
	);
};

const StyledContentWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: @media only screen and (max-width: 1200px) {
		width: 60%;
	}
	@media only screen and (max-width: 900px) {
		width: 100%;
	}
`;
const StyledTitle = styled(Title)`
	text-align: center;
	width: 100%;

	@media only screen and (max-width: 600px) {
		text-align: left;
	}
`;
const StyledText = styled(Text)(
	({ theme: { colors } }) => `
	font-style: italic;
	border-left: 4px solid ${colors.button.defaultBg};
	padding-left: 8px;
	font-weight: bold;
	`
);
const StyledImageWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 16px 0;
	position: relative;
	z-index: 1;
`;

const StyledImage = styled.img(
	({ theme: { shadows } }) => `
	width: 100%;
	max-width: 900px;
	box-shadow: ${shadows.standard};
	border-radius: 20px;
	position: relative;
	z-index: 1;
`
);
