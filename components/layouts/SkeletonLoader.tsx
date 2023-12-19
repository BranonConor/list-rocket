import { AnimationProps, motion } from 'framer-motion';
import styled from 'styled-components';

export const SkeletonLoader = () => {
	return (
		<StyledCard>
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

const StyledCard = styled.div(
	({ theme: { colors } }) => `
    width: 100%;
    background: ${colors.bgLight};
    height: 68px;
    border-radius: 10px;
    margin: 0 0 16px 0;
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
    opacity: 0.5;
`
);
