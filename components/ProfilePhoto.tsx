import styled from 'styled-components';

interface Props {
	photo: string;
	dimensions: string;
	hasBoxShadow?: boolean;
}

export const ProfilePhoto: React.FC<Props> = (props) => {
	const { photo, dimensions, hasBoxShadow = false } = props;

	return (
		<StyledImage
			src={photo}
			width={dimensions}
			height={dimensions}
			hasBoxShadow={hasBoxShadow}
		/>
	);
};

interface IStyledImageProps {
	hasBoxShadow: boolean;
}
const StyledImage = styled.img<IStyledImageProps>(
	({ hasBoxShadow, theme: { shadows } }) => `
	border-radius: 100%;
	transition: 0.15s ease all;
	box-shadow: ${hasBoxShadow ? shadows.standard : 'none'};
`
);
