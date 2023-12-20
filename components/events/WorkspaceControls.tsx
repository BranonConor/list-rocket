import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { ChipButton } from '../buttons/ChipButton';
import { useRouter } from 'next/router';

export const WorkspaceControls = () => {
	const { events } = useContext(EventContext);
	const { currentEvent } = useContext(WorkspaceContext);
	const router = useRouter();
	const handleChipButtonClick = (e, eventId) => {
		e.preventDefault();
		router.push(`/workspace/${eventId}`);
	};

	return (
		<StyledWrapper>
			<StyledYourEventsWrapper>
				<Title variant='heading2'>Your Events</Title>
				<Text variant='body1'>
					{events?.length
						? 'Choose an event to load it into your workspace 👇'
						: 'Head to your dashboard to create your first event! 👏'}
				</Text>
				<StyledEventsWrapper>
					{events?.map((event, index: number) => {
						return (
							<StyledChipWrapper
								key={event._id}
								initial={{
									scale: 0,
									opacity: 0,
									rotate: '15deg',
								}}
								animate={{
									scale: 1,
									opacity: 1,
									rotate: '0deg',
								}}
								transition={{
									duration: 0.125 * (index + 0.5),
									type: 'spring',
								}}>
								<ChipButton
									onClick={(e) =>
										handleChipButtonClick(e, event._id)
									}
									content={event.name}
									isActive={
										currentEvent
											? currentEvent?._id === event._id
											: null
									}
								/>
							</StyledChipWrapper>
						);
					})}
				</StyledEventsWrapper>
			</StyledYourEventsWrapper>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	border-radius: 10px;
	box-sizing: border-box;
	margin: 16px 0;
	width: 100%;
	display: flex;

	@media only screen and (max-width: 768px) {
		width: 100%;
		flex-direction: column;
	}
`;
const StyledYourEventsWrapper = styled.div(
	({ theme: { colors } }) => `
	box-sizing: border-box;
	padding: 16px;
	background: ${colors.bgLight};
	border-radius: 10px;
	width: 100%;
	transition: 0.25s ease all;
`
);
const StyledEventsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: auto;
`;
const StyledChipWrapper = styled(motion.div)`
	margin: 8px 8px 16px 0;
	min-height: 20px;
`;
