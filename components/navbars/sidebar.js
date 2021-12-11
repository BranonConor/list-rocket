import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Menu from './menu';

const Sidebar = () => {
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
				<img src='/icons/rocket-plain.svg' alt='rocket icon' />
				<StyledFlame />
				<StyledFlame />
				<StyledFlame />
				<StyledFlame />
				<StyledFlame />
				<StyledFlame />
				<StyledFlame />
			</StyledBrand>

			<Menu />

			<StyledSubMenuWrapper>
				<Link href='/'>
					<a>
						<img src='/icons/home.svg' atl='Home Icon' />
					</a>
				</Link>
				<a href={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/logout`}>
					<img src='/icons/logout.svg' alt='Logout icon' />
				</a>
			</StyledSubMenuWrapper>

			<StyledStarWrapper>
				<StyledStar />
				<StyledStar />
				<StyledStar />
				<StyledStar />
				<StyledStar />
				<StyledStar />
				<StyledStar />
			</StyledStarWrapper>

			<div>
				<img src='/icons/asteroids.svg' alt='Asteroids Icon' />
				<img src='/icons/asteroids.svg' alt='Asteroids Icon' />
			</div>
		</StyledWrapper>
	);
};

export default Sidebar;

const StyledWrapper = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	overflow: hidden;
	width: 100%;
	padding: 0;
	height: 100%;
	background: ${colors.bgDark};
`
);
const StyledBrand = styled.div`
	padding: 16px 0;
	position: relative;
	top: 0;
	z-index: 8;
	width: 100%;
	height: 100px;
`;
const StyledFlame = styled.div`
	width: 10px;
	height: 10px;
	position: absolute;
`;

const StyledStarWrapper = styled.div``;
const StyledStar = styled.div`
	width: 10px;
	height: 10px;
`;

const StyledSubMenuWrapper = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	overflow: hidden;
	width: 100%;
	padding: 0;
	height: 100%;
	background: ${colors.bgDark};
`
);
