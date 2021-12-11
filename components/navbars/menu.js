import styled from 'styled-components';
import Link from 'next/link';

const Menu = () => {
	return (
		<StyledList>
			<StyledListItem>
				<Link href='/dashboard'>
					<StyledAnchor>
						<img src='icons/grid.svg' alt='Dashboard' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
			<StyledListItem>
				<Link href='/workspace'>
					<StyledAnchor>
						<img src='icons/pencil.svg' alt='Pencil icon' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
			<StyledListItem>
				<Link href='/profile'>
					<StyledAnchor>
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
	padding: 32px 0;
	width: 100%;
	background: ${colors.bgDark};
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
	z-index: 10;
	width: 100%;
`
);
const StyledAnchor = styled.a(
	({ theme: { colors } }) => `
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

    &:hover {
        cursor: pointer;
        background: ${colors.menuLinkHover};
    }
    `
);
