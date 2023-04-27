import { useContext, useEffect } from 'react';
import { CollaboratorsGrid } from '../lists/CollaboratorsGrid';
import { UserList } from '../lists/UserList';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import styled from 'styled-components';
import Pusher from 'pusher-js';

export const Event: React.FC = () => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
	console.log('Current Event: ', currentEvent.name);
	console.log('Lists: ', currentEvent.lists);
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
			if (currentEvent?._id === data.event?._id) {
				prepWorkspace(data.event?._id);
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
				{currentEvent.lists.map((list) => (
					<UserList
						creator={list.creator}
						items={list.items}
						id={list._id}
						key={list._id}
					/>
				))}
			</StyledListWrapper>
		</>
	);
};

const StyledListWrapper = styled.div`
	max-width: 700px;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 16px;

	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;
function prepWorkspace(_id: any) {
	throw new Error('Function not implemented.');
}
