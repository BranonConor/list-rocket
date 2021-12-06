import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

const Home = () => {
	return <StyledWrapper>Hello!</StyledWrapper>;
};

export default Home;

const StyledWrapper = styled.div`
	width: 100%;
	height: 100vh;
	background: black;
	color: white;
`;
