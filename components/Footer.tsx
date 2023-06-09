import styled from 'styled-components';

export const Footer = () => {
	return (
		<StyledFooter>
			App by
			<StyledAnchor
				href='https://liftoff-tech.vercel.app'
				target='_blank'>
				<StyledImage
					src='icons/liftoff-logo.svg'
					alt='Liftoff Technologies'
				/>
			</StyledAnchor>
		</StyledFooter>
	);
};

const StyledFooter = styled.div(
	({ theme: { colors } }) => `
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	color: gray;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	background: white;
	padding: 8px 0;
	border-top: 3px solid ${colors.bgLight};

	@media only screen and (max-width: 768px) {
		display: none;
	}
`
);
const StyledAnchor = styled.a(
	({ theme: { colors } }) => `
	color: ${colors.bgPurple};
	padding: 0 0 0 8px;
	display: flex;
	align-items: center;
	
	&:hover {
		color: ${colors.linkTextHover};
	}
`
);
const StyledImage = styled.img`
	height: 20px;
`;
