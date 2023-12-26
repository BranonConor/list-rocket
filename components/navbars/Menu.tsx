import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { Tooltip } from 'react-tooltip';

export const Menu = () => {
	const currentRoute = useRouter().pathname;
	const { currentEvent } = useContext(WorkspaceContext);

	return (
		<StyledList>
			<StyledListItem
				data-tooltip-id='dashboard'
				data-tooltip-content='Dashboard'>
				<Link href='/dashboard' passHref>
					<StyledAnchor isActive={currentRoute === '/dashboard'}>
						<img src='/icons/grid.svg' alt='Dashboard' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
			<StyledListItem
				data-tooltip-id='workspace'
				data-tooltip-content='Workspace'>
				<Link
					href={
						currentEvent
							? `/workspace/${currentEvent._id}`
							: '/workspace'
					}
					passHref>
					<StyledAnchor
						isActive={currentRoute.includes('/workspace')}>
						<img src='/icons/pencil.svg' alt='Pencil icon' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
			<StyledListItem
				data-tooltip-id='profile'
				data-tooltip-content='Profile'>
				<Link href='/profile' passHref>
					<StyledAnchor isActive={currentRoute === '/profile'}>
						<img src='/icons/user.svg' alt='user icon' />
					</StyledAnchor>
				</Link>
			</StyledListItem>
			<StyledTooltipWrapper>
				<div className='mobile'>
					<Tooltip id='dashboard' place='top' />
					<Tooltip id='workspace' place='top' />
					<Tooltip id='profile' place='top' />
				</div>
				<div className='desktop'>
					<Tooltip id='dashboard' place='right' />
					<Tooltip id='workspace' place='right' />
					<Tooltip id='profile' place='right' />
				</div>
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
	padding: 0;
	width: 100%;
	height: 100%;

	@media only screen and (max-width: 768px) {
		flex-direction: row;
		bottom: 0;
	}
`;
const StyledListItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	list-style: none;
	box-sizing: border-box;
	position: relative;
	top: 0;
	width: 100%;
`;
interface IStyledAnchorProps {
	isActive: boolean;
}
const StyledAnchor = styled.a<IStyledAnchorProps>(
	({ isActive, theme: { colors, shadows } }) => `
	display: flex;
	align-items: center;
    justify-content: center;
	list-style: none;
	box-sizing: border-box;
	position: relative;
	top: 0;
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
