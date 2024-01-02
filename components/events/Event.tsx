import { useContext, useEffect, useState } from 'react';
import { CollaboratorsGrid } from '../lists/CollaboratorsGrid';
import { UserList } from '../lists/UserList';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import styled from 'styled-components';
import Pusher from 'pusher-js';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { AddBlockButton } from '../buttons/AddBlockButton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { AddBlockModal } from './AddBlockModal';
import { Poll } from '../votes/Poll';
import { AddPollModal } from './AddPollModal';

interface IEventProps {
	currentEvent: any;
}

const mockOptions = ['Convenience', 'Collaboration', 'User Experience'];
const mockVotes = [
	{ user: 'branon', option: 'Convenience' },
	{ user: 'rachel', option: 'Convenience' },
	{ user: 'brooke', option: 'User Experience' },
	{ user: 'donna', option: 'Collaboration' },
	{ user: 'cruz', option: 'User Experience' },
	{ user: 'caleb', option: 'Convenience' },
];

export const Event: React.FC<IEventProps> = ({ currentEvent }) => {
	const { refreshEvent } = useContext(WorkspaceContext);
	const [blockModalIsOpen, setBlockModalIsOpen] = useState(false);
	const [pollsModalIsOpen, setPollsModalIsOpen] = useState(false);
	const { user } = useContext(UserContext);

	const { lists, collaborators, pendingCollaborators, polls } = currentEvent;
	const [activeTab, setActiveTab] = useState('lists');

	console.log('Polls: ', polls);

	//This entire grid build is an abonimation and also a stroke of genius
	const getGrid = (columnCount, lists) => {
		const grid = [];
		for (let i = 0; i < columnCount; i++) {
			const items = [];
			for (let j = i; j < lists?.length; j += columnCount) {
				if (lists[j]) {
					items.push(lists[j]);
				}
			}
			grid.push(items);
		}
		return grid;
	};
	const extraLargeGrid = getGrid(7, lists);
	const desktopGrid = getGrid(5, lists);
	const tabletGrid = getGrid(4, lists);
	const mobileGrid = getGrid(1, lists);

	const handleAddListBlock = async () => {
		setBlockModalIsOpen(false);

		try {
			await axios.put(`/api/events/${currentEvent?._id}`, {
				eventId: currentEvent?._id,
				user: user,
				action: 'create-list',
			});
			await axios.post('/api/pusher', {
				eventId: currentEvent?._id,
				user: user,
				action: 'event-update',
			});
			toast.success('List Created 🤘🏽', {
				toastId: 'list-created-toast',
			});
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'list-created-error-toast',
			});
		}
	};

	//pusher code
	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
		});
		//subscribe to the event channel
		const channel = pusher.subscribe(`event-channel-${currentEvent?._id}`);
		//bind a function to the event-channel-update trigger, update UI
		channel.bind(`event-channel-update-${currentEvent?._id}`, (data) => {
			//refresh the workspace if a change occured in the event you're working on
			if (currentEvent?._id === data.eventId) {
				refreshEvent();
			}
		});
		//unsubscribe to the event channel on cleanup
		return () => {
			pusher.disconnect();
		};
	}, []);

	return (
		<StyledEventWrapper>
			<StyledTopWrapper>
				<CollaboratorsGrid
					collaborators={collaborators}
					pendingCollaborators={pendingCollaborators}
				/>
				<StyledTabsWrapper>
					<StyledTab
						isActive={activeTab === 'lists'}
						onClick={() => setActiveTab('lists')}>
						<StyledTabIcon
							src={
								activeTab === 'lists'
									? '/icons/list-light.svg'
									: '/icons/list-dark.svg'
							}
						/>
						Lists
					</StyledTab>
					<StyledTab
						isActive={activeTab === 'polls'}
						onClick={() => setActiveTab('polls')}>
						<StyledTabIcon
							src={
								activeTab === 'polls'
									? '/icons/poll-light.svg'
									: '/icons/poll-dark.svg'
							}
						/>
						Polls
					</StyledTab>
				</StyledTabsWrapper>
			</StyledTopWrapper>
			{activeTab === 'lists' &&
				(!lists?.length ? (
					<StyledEmptyEventWrapper>
						<StyledH3 variant='heading3'>
							NO EVENT BLOCKS ADDED
						</StyledH3>
					</StyledEmptyEventWrapper>
				) : (
					<>
						<StyledGrid id='extra-large-grid'>
							{extraLargeGrid.map((column, index) => {
								return (
									<StyledListWrapper key={index}>
										{column.map((list) => {
											return (
												<UserList
													creator={list?.creator}
													customCreator={
														list?.customCreator
													}
													items={list?.items}
													id={list?._id}
													key={list?._id}
												/>
											);
										})}
									</StyledListWrapper>
								);
							})}
						</StyledGrid>
						<StyledGrid id='desktop-grid'>
							{desktopGrid.map((column, index) => {
								return (
									<StyledListWrapper key={index}>
										{column.map((list) => {
											return (
												<UserList
													creator={list?.creator}
													customCreator={
														list?.customCreator
													}
													items={list?.items}
													id={list?._id}
													key={list?._id}
												/>
											);
										})}
									</StyledListWrapper>
								);
							})}
						</StyledGrid>
						<StyledGrid id='tablet-grid'>
							{tabletGrid.map((column, index) => {
								return (
									<StyledListWrapper key={index}>
										{column.map((list) => {
											return (
												<UserList
													creator={list?.creator}
													customCreator={
														list?.customCreator
													}
													items={list?.items}
													id={list?._id}
													key={list?._id}
												/>
											);
										})}
									</StyledListWrapper>
								);
							})}
						</StyledGrid>
						<StyledGrid id='mobile-grid'>
							{mobileGrid.map((column, index) => {
								return (
									<StyledListWrapper key={index}>
										{column.map((list) => {
											return (
												<UserList
													creator={list?.creator}
													customCreator={
														list?.customCreator
													}
													items={list?.items}
													id={list?._id}
													key={list?._id}
												/>
											);
										})}
									</StyledListWrapper>
								);
							})}
						</StyledGrid>
					</>
				))}

			{activeTab === 'polls' &&
				(polls?.length ? (
					<StyledPollsWrapper>
						{polls?.map((poll) => {
							return (
								<Poll
									creator={poll.creator}
									title={poll.title}
									options={poll.options}
									key={poll.id}
									isOpen={poll.isOpen}
									votes={poll.votes}
								/>
							);
						})}
					</StyledPollsWrapper>
				) : (
					<Text variant='body1'>Nothing here :)</Text>
				))}

			{blockModalIsOpen && (
				<AddBlockModal
					setBlockModalIsOpen={setBlockModalIsOpen}
					handleAddListBlock={handleAddListBlock}
					setPollsModalIsOpen={setPollsModalIsOpen}
				/>
			)}
			{pollsModalIsOpen && (
				<AddPollModal setPollsModalIsOpen={setPollsModalIsOpen} />
			)}
			<StyledButtonWrapper>
				<AddBlockButton onClick={() => setBlockModalIsOpen(true)} />
			</StyledButtonWrapper>
		</StyledEventWrapper>
	);
};

const StyledEventWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;

	#extra-large-grid {
		display: grid;
		grid-template-columns: repeat(7, 300px);
	}
	#desktop-grid {
		display: none;
		grid-template-columns: repeat(5, 300px);
	}
	#tablet-grid {
		display: none;
		grid-template-columns: repeat(4, 300px);
	}
	#mobile-grid {
		display: none;
	}

	@media only screen and (max-width: 1550px) {
		#extra-large-grid {
			display: none;
		}
		#desktop-grid {
			display: grid;
		}
		#tablet-grid {
			display: none;
		}
		#mobile-grid {
			display: none;
		}
	}
	@media only screen and (max-width: 1200px) {
		#extra-large-grid {
			display: none;
		}
		#desktop-grid {
			display: none;
		}
		#tablet-grid {
			display: grid;
		}
		#mobile-grid {
			display: none;
		}
	}
	@media only screen and (max-width: 800px) {
		#extra-large-grid {
			display: none;
		}
		#desktop-grid {
			display: none;
		}
		#tablet-grid {
			display: none;
		}
		#mobile-grid {
			display: flex;
		}
	}
`;
const StyledGrid = styled.div`
	display: grid;
	grid-template-rows: 1fr;
	grid-gap: 16px;
	width: 100%;
	overflow-x: auto;
	padding: 0 0 16px 0;
`;
const StyledListWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	@media only screen and (max-width: 800px) {
		padding: 0 0 0 0;
	}
`;
const StyledEmptyEventWrapper = styled.div(
	({ theme: { colors } }) => `
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${colors.font.body2};
`
);
const StyledH3 = styled(Title)(
	({ theme: { colors } }) => `
	color: ${colors.bgDark};
	opacity: 0.15;
`
);
const StyledButtonWrapper = styled.div`
	position: fixed;
	right: 32px;
	bottom: 64px;
	z-index: 5;

	@media only screen and (max-width: 768px) {
		bottom: 70px;
		right: 16px;
	}
`;
const StyledTabsWrapper = styled.div(
	({ theme: { shadows } }) => `
	width: 100%;
	max-width: 400px;
	display: flex;
	box-shadow: ${shadows.standard};
	border-radius: 10px;
	box-sizing: border-box;
	overflow: hidden;
	height: 36px;
	justify-self: end;
	align-self: center;

	@media only screen and (max-width: 768px) {
		max-width: 100%;
	}
`
);
interface IStyledTabProps {
	isActive?: boolean;
}
const StyledTab = styled.div<IStyledTabProps>(
	({ isActive, theme: { typography, colors } }) => `
	font-size: ${typography.size.caption};
	line-height: ${typography.lineHeight.caption};
	text-transform: ${typography.textTransform.caption};
	box-sizing: border-box;
	background: ${isActive ? colors.tertiaryGradient : 'white'};
	color: ${isActive ? 'white' : colors.bgDark};
	cursor: pointer;
	transition: 0.1s ease all;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50%;

	&:hover {
		background: ${isActive ? colors.tertiaryGradient : colors.chip.defaultBg};
		color: ${isActive ? 'white' : colors.bgDark};
	}
`
);
const StyledTabIcon = styled.img`
	margin-right: 4px;
	width: 14px;
	height: 14px;
`;
const StyledTopWrapper = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-gap: 16px;
	width: 100%;

	margin-bottom: 16px;

	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;
const StyledRocketWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	box-sizing: border-box;
`;
const StyledPollsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 16px;
	width: 100%;
	margin-top: 16px;

	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;
