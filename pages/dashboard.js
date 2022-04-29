import AllEvents from '../components/events/all-events';
import CreateEventForm from '../components/events/create-event';
import DashLayout from '../components/layouts/dash-layout';
import Head from 'next/head';
import ProfilePhoto from '../components/profile-photo';
import { motion } from 'framer-motion';
import axios from 'axios';

const Dashboard = () => {
	// const router = useRouter();
	// const { user } = useContext(UserContext);

	// useEffect(() => {
	//   if(!Object.keys(user).length) {
	//     router.push('/');
	//   }
	// });

	//DUMMY USER
	const user = props.currentUser;

	return (
		<DashLayout>
			<Head>
				<title>Dashboard | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1 className='title'>Dashboard</h1>
			{user ? (
				<motion.div
					initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
					animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
					transition={{
						ease: 'easeIn',
						duration: '0.25',
						type: 'spring',
					}}>
					<ProfilePhoto photo={user.photo} dimensions='50px' />
					<p>Welcome, {user.firstName}! ✌🏼</p>
				</motion.div>
			) : null}
			<CreateEventForm />
			<AllEvents />
		</DashLayout>
	);
};

export default Dashboard;

export async function getServerSideProps() {
	const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/user`);
	return { props: { currentUser: res.data } };
}
