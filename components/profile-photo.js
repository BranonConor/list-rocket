import styled from 'styled-components';

const ProfilePhoto = (props) => {
	return (
		<StyledImage
			src={props.photo}
			width={props.dimensions}
			height={props.dimensions}
		/>
	);
};

export default ProfilePhoto;

const StyledImage = styled.img`
	border-radius: 100%;
`;
