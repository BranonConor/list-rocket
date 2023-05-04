import styled from 'styled-components';
import { SectionContainer } from '../layouts/SectionContainer';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';

export const About = () => {
	return (
		<SectionContainer>
			<StyledWrapper>
				<StyledGraphicWrapper>
					<StyledGraphic src='/graphics/about.svg' alt='' />
				</StyledGraphicWrapper>
				<StyledContentWrapper>
					<Title variant='heading2'>
						Everything, everyone, all in one place.
					</Title>
					<Text variant='body1'>
						Ever tried planning something with a group using
						existing to-do list apps or other disjointed solutions?
						Yeah, us too - that&apos;s why we decided to build
						ListRocket!
					</Text>
					<Text variant='body1'>
						ListRocket combines traditional to-do lists with
						real-time collaborative group features, all in one
						space. Instead of trying to organize an event across
						group chats and random apps, why not work with everyone
						all in one workspace?
					</Text>
				</StyledContentWrapper>
			</StyledWrapper>
		</SectionContainer>
	);
};
const StyledWrapper = styled.div`
	display: flex;
	min-height: 400px;
	align-items: center;
	padding: 64px 0;

	@media only screen and (max-width: 900px) {
		flex-direction: column;
	}
`;
const StyledContentWrapper = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	@media only screen and (max-width: 1200px) {
		width: 60%;
	}
	@media only screen and (max-width: 900px) {
		width: 100%;
	}
`;
const StyledGraphicWrapper = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;

	@media only screen and (max-width: 1200px) {
		width: 40%;
	}
	@media only screen and (max-width: 1100px) {
		justify-content: flex-start;
	}
	@media only screen and (max-width: 900px) {
		width: 100%;
		padding: 0 0 24px 0;
	}
`;
const StyledGraphic = styled.img`
	width: 60%;

	@media only screen and (max-width: 1100px) {
		width: 75%;
	}
	@media only screen and (max-width: 900px) {
		width: 140px;
	}
	@media only screen and (max-width: 400px) {
		width: 100px;
	}
`;
