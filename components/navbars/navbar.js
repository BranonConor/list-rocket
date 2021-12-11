import Button from '../buttons/Button';
import Link from 'next/link';
import styled from 'styled-components';

const Navbar = () => {
	// useEffect(() => {
	//     const [session, loading] = useSession();
	// })
	// const handleSignIn = () => {
	//     signIn("google", { callbackUrl: "http://localhost:3000/" });
	// }
	// const handleSignOut = () => {
	//     signOut();
	// }

	//DUMMY USER - TODO: add user login context
	const user = false;

	return (
		<StyledWrapper>
			<StyledBrand>
				<a href='/'>
					<StyledLogo src='/icons/logo.svg' alt='Light Logo' />
				</a>
			</StyledBrand>
			<StyledMenu>
				<StyledList>
					<StyledItem>
						<StyledLink href='/'>
							<StyledAnchor>Home</StyledAnchor>
						</StyledLink>
					</StyledItem>
					<StyledItem>
						<StyledLink href='/dashboard'>
							<StyledAnchor>Dashboard</StyledAnchor>
						</StyledLink>
					</StyledItem>
					{user ? (
						<Button content='Sign out' light />
					) : (
						<Button content='Sign in' light />
					)}
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
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${colors.linkText};
`
);
const StyledAnchor = styled.a(
	({ theme: { colors } }) => `
	color: ${colors.linkText};
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
	width: 75px;
	height: 75px;
	overflow: hidden;
	transition: 0.1s ease all;
	box-sizing: border-box;

	&:hover {
		cursor: pointer;
	}
`;

// &:hover svg {
//     animation: bounce 0.25s linear 1;
//     animation-fill-mode: forwards;
// }
