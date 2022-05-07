import styled from 'styled-components';
import Menu from './menu';
import Submenu from './submenu';
import Link from 'next/link';

const Sidebar = () => {
	return (
		<StyledWrapper>
			<StyledMenu>
				<StyledBrand
					initial={{ y: '75%', opacity: 0 }}
					animate={{ y: '0%', opacity: 1 }}
					transition={{
						ease: 'easeIn',
						duration: '1',
						type: 'spring',
					}}>
					<StyledLink href='/'>
						<StyledAnchor>
							<StyledLogo
								src='/icons/rocket.svg'
								alt='rocket icon'
							/>
						</StyledAnchor>
					</StyledLink>
				</StyledBrand>
				<Menu />
			</StyledMenu>

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
	border-right: 3px solid ${colors.menuBorder};

	@media only screen and (max-width: 768px) {
		width: 100%;
		height: 100%;
		border-right: none;
		flex-direction: row;
		justify-content: center;
	}
	`
);
const StyledBrand = styled.div`
	padding: 16px 0;
	position: relative;
	top: 0;
	z-index: 8;
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;

	@media only screen and (max-width: 768px) {
		display: none;
	}
`;
const StyledLink = styled(Link)`
	width: 100%;
`;
const StyledAnchor = styled.a`
	width: 100%;
	display: flex;
	justify-content: center;
`;
const StyledMenu = styled.div`
	width: 100%;
	height: 50%;

	@media only screen and (max-width: 768px) {
		height: 100%;
	}
`;
const StyledLogo = styled.img`
	width: 50%;
	height: 50%;
`;
