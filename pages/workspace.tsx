import { DashLayout } from '../components/layouts/DashLayout';
import Head from 'next/head';
import { WorkspaceControls } from '../components/events/WorkspaceControls';
import styled from 'styled-components';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useContext } from 'react';
import { Title } from '../components/typography/Title';
import { Event } from '../components/events/Event';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { LoadingLayout } from '../components/layouts/LoadingLayout';

const Workspace = () => {
	const { currentEvent } = useContext(WorkspaceContext);
	const router = useRouter();
	const { data: session, status } = useSession();

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
		<DashLayout>
			<Head>
				<title>Home | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Title variant='heading1'>Event Workspace</Title>
			<WorkspaceControls />
			{/* ---- WORKSPACE ---- */}
			<StyledWorkspaceWrapper isEventActive={Boolean(currentEvent)}>
				{currentEvent ? (
					<Event />
				) : (
					<StyledH3 variant='heading3'>LOAD AN EVENT</StyledH3>
				)}
			</StyledWorkspaceWrapper>
		</DashLayout>
	);
};

export default Workspace;

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
const StyledH3 = styled(Title)(
	({ theme: { colors } }) => `
	color: ${colors.bgLight}
`
);
