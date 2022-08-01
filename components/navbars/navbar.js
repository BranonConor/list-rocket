import Link from 'next/link';
import styled from 'styled-components';
import { PrimaryButton } from '../buttons/PrimaryButton.tsx';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
	const { data: session, status } = useSession();

	const loggedIn = session && status === 'authenticated';

	return (
		<StyledWrapper>
			<StyledBrand>
				<StyledLogo src='/icons/logo.svg' alt='Light Logo' />
			</StyledBrand>
			<StyledMenu>
				<StyledList>
					<StyledItem>
						{loggedIn && (
							<StyledLink href='/dashboard'>
								<StyledAnchor>Dashboard</StyledAnchor>
							</StyledLink>
						)}
					</StyledItem>
					<StyledItem>
						{loggedIn ? (
							<PrimaryButton
								variant='small'
								content='Sign out'
								onClick={() => signOut()}
							/>
						) : (
							<PrimaryButton
								variant='small'
								content='Sign in'
								onClick={() => signIn()}
							/>
						)}
					</StyledItem>
				</StyledList>
			</StyledMenu>
		</StyledWrapper>
	);
};

export default Navbar;

const StyledWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	position: fixed;
	top: 0;
	z-index: 10;
	width: 100vw;
	height: 75px;
	padding: 0;
	background: black;
`;
const StyledBrand = styled.div`
	position: relative;
	top: 0;
	width: 200px;
	height: auto;
	padding: 4px;
	display: flex;
	align-items: center;
`;
const StyledLogo = styled.img`
	height: 32px;
	margin: 0 0 0 16px;
`;
const StyledMenu = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: auto;
`;
const StyledList = styled.ul`
	width: auto;
	list-style: none;
	padding: 0;
	display: flex;
	margin: 0;
`;
const StyledLink = styled(Link)(
	({ theme: { colors } }) => `
	height: 100%;
	min-width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${colors.link.default};
`
);
const StyledAnchor = styled.a(
	({ theme: { colors } }) => `
	color: ${colors.link.default};
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	padding: 0;
`
);
const StyledItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px 16px;
	min-width: 75px;
	height: 75px;
	overflow: hidden;
	transition: 0.1s ease all;
	box-sizing: border-box;

	&:hover {
		cursor: pointer;
	}

	&:nth-of-type(1) {
		@media only screen and (max-width: 450px) {
			display: none;
		}
	}
`;

// &:hover svg {
//     animation: bounce 0.25s linear 1;
//     animation-fill-mode: forwards;
// }
