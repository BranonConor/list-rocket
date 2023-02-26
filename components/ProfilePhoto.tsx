import styled from 'styled-components';

interface Props {
	photo: string;
	dimensions: string;
}

export const ProfilePhoto: React.FC<Props> = (props) => {
	const { photo, dimensions } = props;

	return <StyledImage src={photo} width={dimensions} height={dimensions} />;
};

const StyledImage = styled.img`
	border-radius: 100%;
	transition: 0.15s ease all;
`;
