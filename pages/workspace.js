import CollaboratorsGrid from '../components/lists/collaborators-grid';
import DashLayout from '../components/layouts/dash-layout';
import Head from 'next/head';
import UserList from '../components/lists/user-list';
import WorkspaceControls from '../components/events/workspace-controls';
import styled from 'styled-components';

const Workspace = () => {
	return (
		<DashLayout>
			<Head>
				<title>Home | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<h1>Event Workspace</h1>
			<WorkspaceControls />
			{/* ---- WORKSPACE ---- */}
			<StyledWorkspaceWrapper>
				{/* <CollaboratorsGrid />
				<UserList /> */}
			</StyledWorkspaceWrapper>
		</DashLayout>
	);
};

export default Workspace;

// export async function getServerSideProps(ctx) {
//   const cookie = ctx.req ? ctx.req.headers.cookie : undefined;
//   return {props: {cookie: cookie}}
// }

const StyledWorkspaceWrapper = styled.div``;
