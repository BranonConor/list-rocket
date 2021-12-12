import styled from 'styled-components';
import Link from 'next/link';

const Submenu = () => {
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
				<StyledAnchor
					href={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/logout`}>
					<img src='/icons/logout.svg' alt='Logout icon' />
				</StyledAnchor>
			</StyledListItem>
		</StyledList>
	);
};

export default Submenu;

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
	padding: 32px 0 0 0;
	width: 100%;
`
);
const StyledListItem = styled.li(
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
