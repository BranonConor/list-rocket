import { useContext, useEffect, useState } from 'react';
import { CollaboratorsGrid } from '../lists/CollaboratorsGrid';
import { UserList } from '../lists/UserList';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import styled from 'styled-components';
import Pusher from 'pusher-js';
import { Title } from '../typography/Title';
import { Text } from '../typography/Text';
import { AddBlockButton } from '../buttons/AddBlockButton';
import { Dialog } from '../Dialog';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

export const Event: React.FC = () => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const [blockModalIsOpen, setBlockModalIsOpen] = useState(false);
	const { user } = useContext(UserContext);

	const lists = currentEvent.lists;

	const handleAddListBlock = async () => {
		setBlockModalIsOpen(false);

		try {
			//Accept user invite, update user and event
			await axios.put(`/api/events/${currentEvent._id}`, {
				eventId: currentEvent._id,
				user: user,
				action: 'create-list',
			});

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
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
	//at this point, there should be a currentEvent so we shouldn't have to
	//worry about null / undefined channel names
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
				prepWorkspace(data.eventId);
			}
		});
		//unsubscribe to the event channel on cleanup
		return () => {
			pusher.disconnect();
		};
	}, []);

	return (
		<StyledEventWrapper>
			<CollaboratorsGrid />
			<StyledListWrapper>
				{lists.map((list) => {
					return (
						<UserList
							creator={list?.creator}
							customCreator={list?.customCreator}
							items={list?.items}
							id={list?._id}
							key={list?._id}
						/>
					);
				})}
			</StyledListWrapper>
			{!lists.length && (
				<StyledEmptyEventWrapper>
					<StyledH3 variant='heading3'>
						NO EVENT BLOCKS ADDED
					</StyledH3>
				</StyledEmptyEventWrapper>
			)}
			{blockModalIsOpen && (
				<Dialog
					maxWidth='80%'
					title='✨ Add Event Blocks'
					description={
						'Customize your event by adding the blocks you need!'
					}
					buttonText={'Cancel'}
					setDialogIsOpen={setBlockModalIsOpen}>
					<StyledBlockSelection>
						<StyledCard onClick={handleAddListBlock}>
							<StyledTitle variant='heading3'>
								<StyledIcon src='/icons/list.svg' />
								List
							</StyledTitle>
							<Text variant='body2'>
								Lists can be assigned a user and be filled with
								various types of nifty List Items
							</Text>
						</StyledCard>
						<StyledComingSoonCard>
							<StyledTitle variant='heading3'>Poll</StyledTitle>
							<Text variant='body2'>Coming soon! 👀</Text>
						</StyledComingSoonCard>
						<StyledComingSoonCard>
							<StyledTitle variant='heading3'>Chats</StyledTitle>
							<Text variant='body2'>Coming soon! 👀</Text>
						</StyledComingSoonCard>
						<StyledComingSoonCard>
							<StyledTitle variant='heading3'>
								Announcements
							</StyledTitle>
							<Text variant='body2'>Coming soon! 👀</Text>
						</StyledComingSoonCard>
					</StyledBlockSelection>
				</Dialog>
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
`;
const StyledListWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-gap: 16px;
	overflow-x: auto;
	padding: 0 0 16px 0;
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
	bottom: calc(40px + 16px);

	@media only screen and (max-width: 768px) {
		bottom: calc(64px + 16px);
	}
`;
const StyledBlockSelection = styled.div(
	({ theme: { colors } }) => `
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-gap: 16px;
	color: ${colors.font.body2};
	padding: 32px 0;
	
	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
		max-height: 300px;
		overflow: auto;
		padding: 8px 0;
	}
`
);
const StyledCard = styled.div(
	({ theme: { colors, shadows } }) => `
	width: 100%;
	background: ${colors.bgLight};
	color: ${colors.font.body};
	border-radius: 8px;
	padding: 16px;
	box-sizing: border-box;
	transition: 0.15s ease all;

	&:hover {
		box-shadow: ${shadows.standard};
		background: white;
		transform: translateY(-3px);
		cursor: pointer;
	}

	@media only screen and (max-width: 768px) {
		padding: 8px 16px;
	}
`
);
const StyledComingSoonCard = styled.div(
	({ theme: { colors } }) => `
	width: 100%;
	background: ${colors.bgLight};
	color: ${colors.font.body};
	border-radius: 8px;
	padding: 16px;
	box-sizing: border-box;
	transition: 0.15s ease all;
	opacity: 0.5;

	&:hover {
		cursor: not-allowed;
	}

	@media only screen and (max-width: 768px) {
		padding: 8px 16px;
	}
`
);
const StyledIcon = styled.img`
	margin: 0 8px 0 0;
`;
const StyledTitle = styled(Title)`
	display: flex;
	align-items: center;
`;
