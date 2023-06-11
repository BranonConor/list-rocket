import { useContext, useEffect } from 'react';
import { CollaboratorsGrid } from '../lists/CollaboratorsGrid';
import { UserList } from '../lists/UserList';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import styled from 'styled-components';
import Pusher from 'pusher-js';
import { UserContext } from '../../contexts/UserContext';

export const Event: React.FC = () => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);

	const currentUserList = currentEvent.lists.filter(
		(list) => list.creator.email === user.email
	);
	const yourList = currentUserList[0];
	const otherLists = currentEvent.lists.filter(
		(list) => list.creator.email !== user.email
	);

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
		<>
			<CollaboratorsGrid />
			<StyledListWrapper>
				<UserList
					creator={yourList?.creator}
					items={yourList?.items}
					id={yourList?._id}
					key={yourList?._id}
				/>
				{otherLists.map((list) => (
					<UserList
						creator={list?.creator}
						items={list?.items}
						id={list?._id}
						key={list?._id}
					/>
				))}
			</StyledListWrapper>
		</>
	);
};

const StyledListWrapper = styled.div`
	width: 100%;
	display: flex;
	overflow-x: auto;
	padding: 0 0 16px 0;
`;
