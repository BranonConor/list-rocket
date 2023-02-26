import { CollaboratorsGrid } from '../components/lists/CollaboratorsGrid';
import { DashLayout } from '../components/layouts/DashLayout';
import Head from 'next/head';
import { WorkspaceControls } from '../components/events/WorkspaceControls';
import styled from 'styled-components';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useContext } from 'react';
import { Title } from '../components/typography/Title';

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
			<StyledWorkspaceWrapper isEventActive={Boolean(currentEvent)}>
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
	align-items: center;
	justify-content: ${isEventActive ? 'flex-start' : 'center'};
`
);
const StyledH3 = styled(Title)(
	({ theme: { colors } }) => `
	color: ${colors.bgLight}
`
);
