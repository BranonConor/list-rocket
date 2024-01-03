import styled from 'styled-components';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

export const Submenu = () => {
	const handleClick = (e: any) => {
		e.preventDefault();
		toast.success('Successfully created your event ✨', {
			toastId: 'unauthenticated-route-toast',
		});
		signOut({
			callbackUrl: `/`,
		});
	};

	return (
		<StyledList>
			<StyledListItem data-tooltip-id='home' data-tooltip-content='Home'>
				<Link href='/' passHref>
					<StyledAnchor>
						<img src='/icons/home.svg' alt='Home Icon' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
			<StyledListItem
				data-tooltip-id='logout'
				data-tooltip-content='Logout'>
				<StyledButton onClick={handleClick}>
					<img src='/icons/logout.svg' alt='Logout icon' />
				</StyledButton>
			</StyledListItem>
			<StyledTooltipWrapper>
				<Tooltip id='home' place='right' />
				<Tooltip id='logout' place='right' />
			</StyledTooltipWrapper>
		</StyledList>
	);
};

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
	width: 72px;
	height: 64px;
	cursor: pointer;
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
	cursor: pointer;

    &:hover {
        background: ${colors.bgLight};
		box-shadow: inset ${shadows.standard};

		img {
			transform: scale(1.10);
		}
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
	width: 72px;
	height: 64px;
	outline: none;
	border: none;
	transition: 0.15s ease all;
	background: none;
	cursor: pointer;

    &:hover {
        background: ${colors.bgLight};
		box-shadow: inset ${shadows.standard};

		img {
			transform: scale(1.10);
		}
    }
    `
);
const StyledTooltipWrapper = styled.div`
	.mobile {
		display: none;
	}
	.desktop {
		display: block;
	}
	@media only screen and (max-width: 768px) {
		.mobile {
			display: block;
		}
		.desktop {
			display: none;
		}
	}
`;
