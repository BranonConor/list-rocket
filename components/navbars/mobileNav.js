import styled from 'styled-components';
import Menu from './menu';
import Link from 'next/link';

const MobileNav = () => {
	return (
		<StyledWrapper>
			<StyledMenu>
				<Menu />
			</StyledMenu>
		</StyledWrapper>
	);
};

export default MobileNav;

const StyledWrapper = styled.div(
	({ theme: { colors, shadows } }) => `
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
	display: none;

	@media only screen and (max-width: 768px) {
		display: flex;
		width: 100%;
		height: 100%;
		border-right: none;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		bottom: 0;
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

	@media only screen and (max-width: 768px) {
		width: 75px;
		height: 75px;
	}
`;
const StyledAnchor = styled.a`
	width: 100%;
	display: flex;
	justify-content: center;

	@media only screen and (max-width: 768px) {
		width: 75px;
		height: 75px;
	}
`;
const StyledMenu = styled.div`
	width: 100%;
	height: 50%;

	@media only screen and (max-width: 768px) {
		height: auto;
	}
`;
