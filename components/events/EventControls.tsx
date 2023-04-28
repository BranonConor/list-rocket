import styled from 'styled-components';
import { ToggleSwitch } from '../inputs/ToggleSwitch';
import { useState } from 'react';

export const EventControls = () => {
	const [anonymousModeIsOn, setAnonymousModeIsOn] = useState(false);
	const [toggleIsChecked, setToggleIsChecked] = useState(false);
	const handleToggleChange = () => {
		setToggleIsChecked(!toggleIsChecked);
		setAnonymousModeIsOn(!anonymousModeIsOn);
	};

	return (
		<StyledEventControls>
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

const StyledEventControls = styled.div(
	({ theme: { colors } }) => `
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
