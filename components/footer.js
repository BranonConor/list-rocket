import styled from 'styled-components';

const Footer = () => {
	return (
		<StyledFooter>
			App by
			<StyledAnchor href='https://www.branon.dev' target='_blank'>
				AXN Creative
			</StyledAnchor>
		</StyledFooter>
	);
};

export default Footer;

const StyledFooter = styled.div(
	({ theme: { colors } }) => `
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 5;
	height: 32px;
	width: 100%;
	color: gray;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	background: white;
	border-top: 3px solid ${colors.bgLight};
`
);
const StyledAnchor = styled.a(
	({ theme: { colors } }) => `
	color: ${colors.bgPurple};
	padding: 0 0 0 8px;

	
	&:hover {
		color: ${colors.linkTextHover};
	}
`
);
