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
	height: 600px;
	align-items: center;
`;
const StyledContentWrapper = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 64px 0;
`;
const StyledGraphicWrapper = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
`;
const StyledGraphic = styled.img`
	width: 50%;
`;
