import styled from 'styled-components';
import { SectionContainer } from '../layouts/SectionContainer';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { ChipButton } from '../buttons/ChipButton';

export const Features = () => {
	return (
		<SectionContainer>
			<StyledContentWrapper>
				<StyledTitleWrapper>
					<StyledTitle variant='heading2'>
						A Next-Gen Tool
					</StyledTitle>
				</StyledTitleWrapper>
				<StyledContentBlock>
					<StyledGraphic
						src='/graphics/list-items.svg'
						alt=''
						draggable={false}
					/>
					<StyledContent>
						<ChipButton
							isActive={false}
							content='Simplicity first'
						/>
						<Title variant='heading2'>Simple Building Blocks</Title>
						<Text variant='body1'>
							Fill your lists with list items, that sport a simple
							yet intuitive design to put only the most important
							info front and center.
						</Text>
					</StyledContent>
				</StyledContentBlock>
				<StyledContentBlock>
					<StyledContent>
						<ChipButton isActive={false} content='Live updates' />
						<Title variant='heading2'>
							Real-time Collaboration
						</Title>
						<Text variant='body1'>
							Events update in realtime as your fellow
							collaborators edit lists, manage the event
							configurations, and more.
						</Text>
					</StyledContent>
					<StyledGraphic
						src='/graphics/real-time.svg'
						alt=''
						draggable={false}
					/>
				</StyledContentBlock>
				<StyledContentBlock>
					<StyledGraphic
						src='/graphics/event-controls.svg'
						alt=''
						draggable={false}
					/>
					<StyledContent>
						<ChipButton isActive={false} content='Configurations' />
						<Title variant='heading2'>Customizable Views</Title>
						<Text variant='body1'>
							Configure each event to meet the needs of your
							group, drawing on an ever-growing collection of UI
							configurations.
						</Text>
					</StyledContent>
				</StyledContentBlock>
			</StyledContentWrapper>
		</SectionContainer>
	);
};

const StyledContentWrapper = styled.div(
	({ theme: { colors } }) => `
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	background: ${colors.primaryGradient};
	color: ${colors.white};
	border-radius: 20px;
	padding: 16px;
	box-sizing: border-box;

	padding: @media only screen and (max-width: 1200px) {
		width: 60%;
	}
	@media only screen and (max-width: 900px) {
		width: 100%;
	}
`
);
const StyledTitleWrapper = styled.div(
	({ theme: { shadows } }) => `
	position: sticky;
	top: 88px;
	background: white;
	border-radius: 10px;
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 10px 16px 8px 16px;
	box-sizing: border-box;
	box-shadow: ${shadows.standard};
`
);
const StyledTitle = styled(Title)`
	text-align: center;
	width: 210px;
	margin: 0;
	background: linear-gradient(
		90deg,
		#eb5757 0%,
		#ff00a8 51.56%,
		#ff9900 94.79%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;

	@media only screen and (max-width: 600px) {
		text-align: left;
	}
`;
const StyledContentBlock = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin: 64px 0 32px 0;

	@media only screen and (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;

		&:nth-of-type(3) {
			flex-direction: column-reverse;
		}
	}
`;
const StyledGraphic = styled.img`
	width: 50%;
	@media only screen and (max-width: 768px) {
		width: 100%;
	}
`;
const StyledContent = styled.div`
	width: 50%;
	padding: 0 16px;
	box-sizing: border-box;
	h2 {
		margin: 32px 0 16px 0;
	}

	@media only screen and (max-width: 768px) {
		width: 100%;
		padding: 0;
	}
`;
