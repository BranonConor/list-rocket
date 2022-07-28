import CollaboratorsGrid from '../components/lists/collaborators-grid';
import DashLayout from '../components/layouts/dash-layout';
import Head from 'next/head';
import UserList from '../components/lists/user-list';
import WorkspaceControls from '../components/events/workspace-controls';
import styled from 'styled-components';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useContext } from 'react';
import { Title } from '../components/typography/Title.tsx';
import { Text } from '../components/typography/Text.tsx';

const Workspace = () => {
	const { currentEvent } = useContext(WorkspaceContext);

	return (
		<DashLayout>
			<Head>
				<title>Home | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Title variant='heading1'>Event Workspace</Title>
			<WorkspaceControls />
			{/* ---- WORKSPACE ---- */}
			<StyledWorkspaceWrapper isEventActive={currentEvent}>
				{currentEvent ? (
					<>
						<CollaboratorsGrid />
					</>
				) : (
					<StyledH3 variant='heading3'>LOAD AN EVENT</StyledH3>
				)}
			</StyledWorkspaceWrapper>
		</DashLayout>
	);
};

export default Workspace;

// export async function getServerSideProps(ctx) {
//   const cookie = ctx.req ? ctx.req.headers.cookie : undefined;
//   return {props: {cookie: cookie}}
// }

const StyledWorkspaceWrapper = styled.div(
	({ isEventActive, theme: { colors } }) => `
	border: 2px dashed ${colors.bgLight};
	border-radius: 10px;
	padding: 16px;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: ${isEventActive ? 'flex-start' : 'center'};
`
);
const StyledH3 = styled(Title)(
	({ theme: { colors } }) => `
	color: ${colors.bgLight}
`
);
