import styled from 'styled-components';

const Footer = () => {
	return (
		<StyledFooter>
			App by the
			<StyledAnchor href='https://www.branon.dev' target='_blank'>
				{' '}
				AXN Creative
			</StyledAnchor>
		</StyledFooter>
	);
};

export default Footer;

const StyledFooter = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	height: 32px;
	width: 100%;
	color: white;
	display: flex;
	justify-content: center;
`;
const StyledAnchor = styled.a(
	({ theme: { colors } }) => `
	color: ${colors.linkText};
	padding: 0 0 0 8px;
	
	&:hover {
		color: ${colors.linkTextHover};
	}
`
);
