import CollaboratorsGrid from '../components/lists/collaborators-grid'
import DashLayout from '../components/layouts/dash-layout'
import { EventContext } from '../contexts/EventContext'
import Head from 'next/head'
import { UserContext } from '../contexts/UserContext'
import UserList from '../components/lists/user-list'
import { WorkspaceContext } from '../contexts/WorkspaceContext'
import WorkspaceControls from '../components/events/workspace-controls'
import styles from './workspace.module.scss'
import { useContext } from 'react'
const Workspace = () => {

  const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);
  const { user } = useContext(UserContext);
  const { events } = useContext(EventContext);

  return (
    <DashLayout>
        <Head>
          <title>Home | List Rocket</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Event Workspace</h1>
        <WorkspaceControls />
        {/* ---- WORKSPACE ---- */}
        <div className={styles.Workspace}>

        </div>
    </DashLayout>
  )
}

export default Workspace

// export async function getServerSideProps(ctx) {
//   const cookie = ctx.req ? ctx.req.headers.cookie : undefined;
//   return {props: {cookie: cookie}}
// }