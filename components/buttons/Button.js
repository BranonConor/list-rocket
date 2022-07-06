import styled from 'styled-components';

const Button = (props) => {
	const handleClick = () => {
		props.onClick ? props.onClick() : null;
	};

	return (
		<StyledButton
			download={props.download === true}
			onClick={handleClick}
			{...props}>
			{/* if an icon prop is passed, display it */}
			{props.icon && (
				<img
					src={props.icon}
					alt='Button Icon'
					width='30'
					height='30'
				/>
			)}
			{/* display the content passed as a prop i.e. - what goes inside the button? */}
			{props.content}
		</StyledButton>
	);
};

export default Button;

const StyledButton = styled.button(
	({ width, theme: { colors } }) => `
	width: ${width || '125px'};
	height: 40px;
	margin: 16px 0;
	background: ${colors.button.defaultBg};
	padding: 8px 16px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	border: none;
	color: ${colors.white};
	text-decoration: none;
	outline: none;
	transition: 0.10s ease all;
	
	&:hover {
		cursor: pointer;
		background: ${colors.button.hoverBg};
	}
`
);
