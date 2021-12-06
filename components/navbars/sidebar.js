import AsteroidIcon from '../icons/asteroids';
import GridIcon from '../icons/grid';
import HomeIcon from '../icons/home';
import Link from 'next/link';
import LogoutIcon from '../icons/logout';
import PencilIcon from '../icons/pencil';
import RocketPlainIcon from '../icons/rocket-plain';
import { UserContext } from '../../contexts/UserContext';
import UserIcon from '../icons/user';
import { motion } from 'framer-motion';
import styles from './sidebar.module.scss';
import styled from 'styled-components';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const Sidebar = () => {
	const router = useRouter();
	const { signOut } = useContext(UserContext);

	// const handleLogout = (event) => {
	//     event.preventDefault();
	//     signOut();
	//     router.push('/');
	// }

	return (
		<StyledWrapper>
			<StyledBrand
				initial={{ y: '75%', opacity: 0 }}
				animate={{ y: '0%', opacity: 1 }}
				transition={{ ease: 'easeIn', duration: '1', type: 'spring' }}>
				<RocketPlainIcon />
				<div className={styles.flame}></div>
				<div className={styles.flame}></div>
				<div className={styles.flame}></div>
				<div className={styles.flame}></div>
				<div className={styles.flame}></div>
				<div className={styles.flame}></div>
			</StyledBrand>

			<div className={styles.menu}>
				<ul>
					<li>
						<Link href='/dashboard'>
							<a>
								<GridIcon />
							</a>
						</Link>
					</li>
					<li>
						<Link href='/workspace'>
							<a>
								<PencilIcon />
							</a>
						</Link>
					</li>
					<li>
						<Link href='/profile'>
							<a>
								<UserIcon />
							</a>
						</Link>
					</li>
				</ul>
			</div>

			<div className={styles.topLevelButtons}>
				<Link href='/'>
					<a className={styles.button}>
						<HomeIcon />
					</a>
				</Link>
				<a
					href={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/logout`}
					className={styles.button}>
					<LogoutIcon />
				</a>
			</div>

			<div className={styles.planet}>
				<div className={styles.star}></div>
				<div className={styles.star}></div>
				<div className={styles.star}></div>
				<div className={styles.star}></div>
				<div className={styles.star}></div>
				<div className={styles.star}></div>
			</div>

			<div className={styles.asteroids}>
				<AsteroidIcon />
				<AsteroidIcon />
			</div>
		</StyledWrapper>
	);
};

export default Sidebar;

const StyledWrapper = styled.div`
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	overflow: hidden;
	width: 100%;
	padding: 0;
	height: 100%;
`;
const StyledBrand = styled.div`
	padding: 16px 0;
	position: relative;
	top: 0;
	z-index: 8;
`;
