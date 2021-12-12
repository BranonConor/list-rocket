import DashLayout from '../components/layouts/dash-layout';
import Head from 'next/head';

const Profile = () => {
	return (
		<DashLayout>
			<Head>
				<title>Profile | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<h1>Profile Page</h1>
				<p>Profile stuff goes here...</p>
			</main>
		</DashLayout>
	);
};

export default Profile;
