import styled from 'styled-components';

const Footer = () => {
	return <StyledFooter>App by Branon Eusebio</StyledFooter>;
};

export default Footer;

const StyledFooter = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	height: 32px;
	width: 100%;
	color: white;
`;
