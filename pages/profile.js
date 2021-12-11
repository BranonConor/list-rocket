import { useContext, useEffect } from 'react';

import DashLayout from '../../list-rocket/components/layouts/dash-layout';
import Head from 'next/head';
import ProfileCard from '../../list-rocket/components/cards/profile-card';
import { UserContext } from '../../list-rocket/contexts/UserContext';
import { useRouter } from 'next/router';

const Profile = () => {
	const router = useRouter();
	// const { user } = useContext(UserContext);

	return (
		<DashLayout>
			<Head>
				<title>Profile | List Rocket</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<h1 className='title'>Profile</h1>
				{Object.keys(user).length ? (
					<ProfileCard
						firstName={user.firstName}
						lastName={user.lastName}
						photo={user.photo}
						email={user.email}
					/>
				) : null}
			</main>
		</DashLayout>
	);
};

export default Profile;
