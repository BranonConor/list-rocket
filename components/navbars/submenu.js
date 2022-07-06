import styled from 'styled-components';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Submenu = () => {
	const handleClick = (e) => {
		e.preventDefault();
		signOut({
			callbackUrl: `/`,
		});
	};

	return (
		<StyledList>
			<StyledListItem>
				<Link href='/'>
					<StyledAnchor>
						<img src='/icons/home.svg' atl='Home Icon' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
			<StyledListItem>
				<StyledButton onClick={handleClick}>
					<img src='/icons/logout.svg' alt='Logout icon' />
				</StyledButton>
			</StyledListItem>
		</StyledList>
	);
};

export default Submenu;

const StyledList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	list-style: none;
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	padding: 32px 0 0 0;
	width: 100%;

	@media only screen and (max-width: 768px) {
		display: none;
	}
`;
const StyledListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	list-style: none;
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	width: 100%;
`;
const StyledAnchor = styled.a(
	({ theme: { colors, shadows } }) => `
	display: flex;
	align-items: center;
    justify-content: center;
	list-style: none;
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	width: 100%;
    height: 64px;
	transition: 0.15s ease all;

    &:hover {
        cursor: pointer;
        background: ${colors.bgLight};
		box-shadow: inset ${shadows.standard};
		transform: scale(1.10);
    }
    `
);
const StyledButton = styled.button(
	({ theme: { colors, shadows } }) => `
	display: flex;
	align-items: center;
    justify-content: center;
	list-style: none;
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	width: 100%;
    height: 64px;
	outline: none;
	border: none;
	transition: 0.15s ease all;
	background: none;

    &:hover {
        cursor: pointer;
        background: ${colors.bgLight};
		box-shadow: inset ${shadows.standard};
		transform: scale(1.10);
    }
    `
);
