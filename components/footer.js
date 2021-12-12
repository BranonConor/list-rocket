import styled from 'styled-components';

const Footer = () => {
	return (
		<StyledFooter>
			<StyledSpan>
				App by
				<StyledAnchor href='https://www.branon.dev' target='_blank'>
					{' '}
					AXN Creative
				</StyledAnchor>
			</StyledSpan>
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
	color: gray;
	display: flex;
	justify-content: center;
`;
const StyledAnchor = styled.a(
	({ theme: { colors } }) => `
	color: ${colors.bgPurple};
	padding: 0 0 0 8px;
	
	&:hover {
		color: ${colors.linkTextHover};
	}
`
);
const StyledSpan = styled.span`
	border-radius: 10px;
	background: white;
	padding: 0 16px;
`;
