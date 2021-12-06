import Button from '../buttons/Button';
import Link from 'next/link';
import LogoLight from '../icons/logo';
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

	return (
		<StyledWrapper>
			<StyledBrand>
				<a href='/'>
					<LogoLight />
				</a>
			</StyledBrand>
			<StyledMenu>
				<StyledList>
					<StyledItem>
						<Link href='/'>
							<a>Home</a>
						</Link>
					</StyledItem>
					{/* { Object.keys(user).length ? 
                        <li>
                            <Link href='/dashboard'>
                                <a>Dashboard</a>
                            </Link>
                        </li>
                        :
                        null
                    }
                    { Object.keys(user).length ?
                        <Button 
                            content='Sign out'
                            onClick={handleSignOut}
                        />
                        :
                        <Button 
                            content='Sign in'
                            onClick={handleSignIn}
                        />
                    } */}
				</StyledList>
			</StyledMenu>
		</StyledWrapper>
	);
};

export default Navbar;

const StyledWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	position: fixed;
	top: 0;
	z-index: 10;
	width: 100vw;
	height: 75px;
	padding: 0;
`;
const StyledBrand = styled.div`
	position: relative;
	top: 0;
	width: 200px;
	height: auto;
	padding: 4px;
`;
const StyledMenu = styled.div`
	margin: 16px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: auto;
	padding: 4px;
`;
const StyledList = styled.ul`
	width: auto;
	list-style: none;
	padding: 0;
	display: flex;
	margin: 0;
`;
const StyledItem = styled.li`
	padding: 8px 16px;
	min-width: 75px;
	height: 75px;
	@extend %col-center;
	overflow: hidden;
	transition: 0.1s ease all;

	&:hover {
		cursor: pointer;
	}
`;

// &:hover svg {
//     animation: bounce 0.25s linear 1;
//     animation-fill-mode: forwards;
// }
