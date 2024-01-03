import styled from 'styled-components';
import { Menu } from './Menu';
import { Submenu } from './Submenu';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const ProductNav = () => {
	return (
		<StyledWrapper>
			<StyledMenu>
				<StyledBrand
					initial={{ y: '15%', opacity: 0 }}
					animate={{ y: '0%', opacity: 1 }}
					transition={{
						duration: 1,
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

const StyledWrapper = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	width: 100%;
	height: 100%;
	max-height: 100vh;
	padding: 0;
	background: ${colors.white};
	border-right: 3px solid ${colors.menu.border};

	@media only screen and (max-width: 768px) {
		width: 100%;
		height: 100%;
		border-right: none;
		flex-direction: row;
		justify-content: center;
	}
	`
);
const StyledBrand = styled(motion.div)`
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

	&:hover {
		cursor: pointer;
	}
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
