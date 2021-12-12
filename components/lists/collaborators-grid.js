import { motion } from 'framer-motion';
import styled from 'styled-components';

const CollaboratorsGrid = () => {
	return (
		<StyledGrid
			initial={{ scale: 0, opacity: 0, rotate: '15deg' }}
			animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
			transition={{ ease: 'easeIn', duration: '0.25', type: 'spring' }}>
			OTHER LISTS
		</StyledGrid>
	);
};

export default CollaboratorsGrid;

const StyledGrid = styled(motion.div)``;
