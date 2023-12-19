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
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { UserContext } from '../../contexts/UserContext';

//get the id from the route params, pass it into the component
export const getServerSideProps = async ({ params }) => {
	const { eventId } = params;

	return {
		props: { event: eventId },
	};
};

const EventPage = ({ event }) => {
	const { currentEvent, prepWorkspace, clearWorkspace } =
		useContext(WorkspaceContext);
	const { user } = useContext(UserContext);
	const { status } = useSession();
	const router = useRouter();

	//get the eventId and set the workspace context's currentId to it, it'll handle the data fetching and send it through in currentEvent
	useEffect(() => {
		prepWorkspace(event);
	}, []);

	if (status === 'unauthenticated') {
		toast.error('You must be logged in to access that page!', {
			toastId: 'unauthenticated-route-toast',
		});
		router.push('/');
	}

	if (currentEvent && user) {
		let userHasEventAccess = false;
		currentEvent?.collaborators?.forEach((collaborator) => {
			if (collaborator._id === user?._id) userHasEventAccess = true;
		});
		if (!userHasEventAccess) {
			clearWorkspace();
			toast.error(
				'You must be invited to this event as a collaborator to access it.',
				{
					toastId: 'not-a-collaborator-toast',
				}
			);
			router.push('/workspace');
		}
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
			<StyledWorkspaceWrapper>
				{currentEvent && <Event currentEvent={currentEvent} />}
			</StyledWorkspaceWrapper>
		</DashLayout>
	);
};

export default EventPage;

const StyledWorkspaceWrapper = styled.div(
	({ theme: { colors } }) => `
	border: 2px dashed ${colors.bgLight};
	border-radius: 10px;
	padding: 16px;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
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
