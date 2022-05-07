import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Menu = () => {
	const currentRoute = useRouter().pathname;

	return (
		<StyledList>
			<StyledListItem>
				<Link href='/dashboard'>
					<StyledAnchor
						isActive={currentRoute === '/dashboard' ? true : false}>
						<img src='icons/grid.svg' alt='Dashboard' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
			<StyledListItem>
				<Link href='/workspace'>
					<StyledAnchor
						isActive={currentRoute === '/workspace' ? true : false}>
						<img src='icons/pencil.svg' alt='Pencil icon' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
			<StyledListItem>
				<Link href='/profile'>
					<StyledAnchor
						isActive={currentRoute === '/profile' ? true : false}>
						<img src='/icons/user.svg' alt='user icon' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
		</StyledList>
	);
};

export default Menu;

const StyledList = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	flex-direction: column;
	align-items: center;
	list-style: none;
	box-sizing: border-box;
	position: relative;
	top: 0;
	z-index: 10;
	padding: 0;
	width: 100%;
	height: 100%;

	@media only screen and (max-width: 768px) {
		flex-direction: row;
		bottom: 0;
	}
`
);
const StyledListItem = styled.div(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
    justify-content: center;
	list-style: none;
	box-sizing: border-box;
	position: relative;
	top: 0;
	width: 100%;
`
);
const StyledAnchor = styled.a(
	({ isActive, theme: { colors, shadows } }) => `
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
	background: ${isActive && colors.bgLight};
	box-shadow: inset ${isActive && shadows.standard};
	transition: 0.1s ease all;

	img {
		transition: 0.1s ease all;
		transform: ${isActive && 'scale(1.3)'};
	}

    &:hover {
        cursor: pointer;
        background: ${colors.bgLight};
		box-shadow: inset ${shadows.standard};

		img {
			transition: 0.1s ease all;
			transform: scale(1.3);
		}
    }
    `
);
