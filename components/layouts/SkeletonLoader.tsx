import { motion } from 'framer-motion';
import styled from 'styled-components';

interface ISkeletonProps {
	width?: string;
	height?: string;
	shape?: 'circle' | 'rectangle';
	margin?: string;
}

export const SkeletonLoader: React.FC<ISkeletonProps> = ({
	shape = 'rectangle',
	...otherProps
}) => {
	return (
		<StyledCard shape={shape} {...otherProps}>
			<StyledSkeleton
				animate={{
					x: ['-100%', '1000%'],
				}}
				transition={{
					duration: '2',
					repeat: Infinity,
				}}
			/>
		</StyledCard>
	);
};

const StyledCard = styled.div<ISkeletonProps>(
	({ width, height, shape, margin, theme: { colors } }) => `
    width: ${width || '100%'};
    min-width: ${width || '100%'};
    height: ${height || '40px'};
    background: ${colors.bgLight};
    border-radius: ${shape === 'circle' ? '100%' : '10px'};
    margin: ${margin || '0 0 16px 0'};
    overflow: hidden;
    position: relative;
`
);

const StyledSkeleton = styled(motion.div)(
	({ theme: { colors } }) => `
    width: 100%;
    background: ${colors.white};
    height: 100%;
    position: absolute;
    opacity: 0.45;
`
);
