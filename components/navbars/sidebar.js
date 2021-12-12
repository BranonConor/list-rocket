import { motion } from 'framer-motion';
import styled from 'styled-components';
import Menu from './menu';
import Submenu from './submenu';

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
				<StyledLogo src='/icons/rocket.svg' alt='rocket icon' />
			</StyledBrand>

			<Menu />

			<Submenu />
		</StyledWrapper>
	);
};

export default Sidebar;

const StyledWrapper = styled.div(
	({ theme: { colors, shadows } }) => `
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	overflow: hidden;
	width: 100%;
	padding: 0;
	height: 100vh;
	background: ${colors.white};
	border-right: 2px solid ${colors.menuBorder};
	box-shadow: ${shadows.standard};
`
);
const StyledBrand = styled.div`
	padding: 16px 0;
	position: relative;
	top: 0;
	z-index: 8;
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: center;
`;

const StyledLogo = styled.img`
	width: 50%;
	height: 50%;
`;
