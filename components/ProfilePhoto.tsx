import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';

interface Props {
	photo: string;
	dimensions: string;
	hasBoxShadow?: boolean;
	showTooltip?: boolean;
	tooltipId?: string;
	tooltipContent?: string;
}

export const ProfilePhoto: React.FC<Props> = (props) => {
	const {
		photo,
		dimensions,
		hasBoxShadow = false,
		showTooltip = false,
		tooltipId,
		tooltipContent,
	} = props;

	return (
		<>
			<StyledImage
				src={photo}
				width={dimensions}
				height={dimensions}
				hasBoxShadow={hasBoxShadow}
				data-tooltip-id={tooltipId}
				data-tooltip-content={tooltipContent}
			/>
			{showTooltip && <Tooltip id={tooltipId} place='top' />}
		</>
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
	background: white;
`
);
