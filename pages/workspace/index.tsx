import { DashLayout } from '../../components/layouts/DashLayout';
import Head from 'next/head';
import { WorkspaceControls } from '../../components/events/WorkspaceControls';
import styled from 'styled-components';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { useContext } from 'react';
import { Title } from '../../components/typography/Title';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { LoadingLayout } from '../../components/layouts/LoadingLayout';
import { motion } from 'framer-motion';

const Workspace = () => {
	const { currentEvent } = useContext(WorkspaceContext);
	const router = useRouter();
	const { status } = useSession();

	if (currentEvent) {
		router.push(`/workspace/${currentEvent._id}`);
	}
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
			<StyledTitleWrapper
				initial={{ opacity: 0, x: '32px' }}
				animate={{ opacity: 1, x: '0' }}
				transition={{
					duration: 0.25,
					type: 'spring',
				}}>
				<Title variant='heading1'>Event Workspace</Title>
			</StyledTitleWrapper>
			<WorkspaceControls />
			{/* ---- WORKSPACE ---- */}
			<StyledWorkspaceWrapper>
				<StyledH3 variant='heading3'>LOAD AN EVENT</StyledH3>
			</StyledWorkspaceWrapper>
		</DashLayout>
	);
};

export default Workspace;

const StyledWorkspaceWrapper = styled.div(
	({ theme: { colors } }) => `
	border: 2px dashed ${colors.bgLight};
	border-radius: 10px;
	padding: 16px;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	`
);
const StyledH3 = styled(Title)(
	({ theme: { colors } }) => `
	color: ${colors.bgDark};
	opacity: 0.15;
`
);
const StyledTitleWrapper = styled(motion.div)``;
