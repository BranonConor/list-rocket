import styled from 'styled-components';
import { ToggleSwitch } from '../inputs/ToggleSwitch';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

export const EventControls = () => {
	const { anonymousModeIsOn, setAnonymousModeIsOn } =
		useContext(WorkspaceContext);

	const [toggleIsChecked, setToggleIsChecked] = useState(false);
	const handleToggleChange = () => {
		setToggleIsChecked(!toggleIsChecked);
		setAnonymousModeIsOn(!anonymousModeIsOn);
	};

	return (
		<StyledEventControls
			initial={{
				top: -20,
				opacity: 0,
			}}
			animate={{
				top: 0,
				opacity: 1,
			}}
			transition={{
				duration: 0.25,
				type: 'spring',
				delay: 0.05,
			}}>
			<StyledRow>
				<StyledAnonymousLabel>Anonymous Mode:</StyledAnonymousLabel>
				<ToggleSwitch
					handleChange={handleToggleChange}
					checked={toggleIsChecked}
				/>
			</StyledRow>
		</StyledEventControls>
	);
};

const StyledEventControls = styled(motion.div)(
	({ theme: { colors } }) => `
    position: relative;
	padding: 16px;
    border-radius: 10px;
	box-sizing: border-box;
    background: ${colors.bgLight};
	height: 100%;
	width: 100%;
	max-width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
`
);

const StyledAnonymousLabel = styled.span`
	width: 100%;
	margin-right: 16px;
`;
const StyledRow = styled.div`
	display: flex;
	align-items: center;
	margin: 8px 0;
	width: 100%;
`;
