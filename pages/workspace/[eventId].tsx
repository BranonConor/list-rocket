import { DashLayout } from '../../components/layouts/DashLayout';
import Head from 'next/head';
import { WorkspaceControls } from '../../components/events/WorkspaceControls';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../components/typography/Title';
import { Event } from '../../components/events/Event';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { LoadingLayout } from '../../components/layouts/LoadingLayout';
import axios from 'axios';
import { IEvent } from '../../contexts/types';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

export const getServerSideProps = async ({ params }) => {
	const { eventId } = params;
	console.log('id: ', eventId);
	const res = await axios.get(
		`${process.env.NEXTAUTH_URL}/api/events/${eventId}`
	);
	await console.log(res);

	return {
		props: { event: res.data.data },
	};
};

const EventPage = ({ event }) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	const { eventId } = router.query;
	console.log(event);
	// const [currentEvent, setCurrentEvent] = useState<IEvent | null>();
	const { currentEvent, setCurrentEvent } = useContext(WorkspaceContext);
	//get the event and set it as the current event
	useEffect(() => {
		const getEvent = async () => {
			setCurrentEvent(event);
		};
		getEvent();
	}, []);

	if (status === 'unauthenticated') {
		toast.error('You must be logged in to access that page!', {
			toastId: 'unauthenticated-route-toast',
		});
		router.push('/');
	}
	if (status === 'loading') {
		return <LoadingLayout>Loading...</LoadingLayout>;
	}

	return (
		<DashLayout isWorkspace>
			<Head>
				<title>Home | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<StyledTitle variant='heading1'>{currentEvent?.name}</StyledTitle>

			<WorkspaceControls />
			{/* ---- WORKSPACE ---- */}
			<StyledWorkspaceWrapper isEventActive={Boolean(currentEvent)}>
				{currentEvent && <Event currentEvent={currentEvent} />}
			</StyledWorkspaceWrapper>
		</DashLayout>
	);
};

export default EventPage;

interface StyledWorkspaceWrapperProps {
	isEventActive: boolean;
}
const StyledWorkspaceWrapper = styled.div<StyledWorkspaceWrapperProps>(
	({ isEventActive, theme: { colors } }) => `
	border: 2px dashed ${colors.bgLight};
	border-radius: 10px;
	padding: 16px;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	align-items: ${isEventActive ? 'flex-start' : 'center'};
	justify-content: ${isEventActive ? 'flex-start' : 'center'};
`
);
const StyledTitle = styled(Title)(
	({ theme: { colors, typography, shadows } }) => `
	@media only screen and (max-width: 768px) {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px 16px 0px 16px;
		background: ${colors.tertiaryGradient};
		font-size: ${typography.size.heading2};
		line-height: ${typography.lineHeight.heading2};
		margin: 8px 0;
		border-radius: 10px;
		color: white;
		box-shadow: ${shadows.standard};
	}
`
);
