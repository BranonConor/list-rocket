import { useContext, useEffect } from 'react';
import { CollaboratorsGrid } from '../lists/CollaboratorsGrid';
import { UserList } from '../lists/UserList';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import styled from 'styled-components';
import Pusher from 'pusher-js';
import { Title } from '../typography/Title';

export const Event: React.FC = () => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);

	const lists = currentEvent.lists;

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
		</StyledEventWrapper>
	);
};

const StyledEventWrapper = styled.div`
	width: 100%;
	height: 100%;
`;
const StyledListWrapper = styled.div`
	width: 100%;
	display: flex;
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
