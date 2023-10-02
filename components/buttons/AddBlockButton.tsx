import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

export const AddBlockButton: React.FC<
	React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
	return (
		<StyledButton {...props}>
			<StyledIcon src='/icons/add.svg' />
		</StyledButton>
	);
};

const StyledButton = styled.button(
	({ theme: { shadows } }) => `
	width: 50px;
	height: 50px;
	border-radius: 100%; 
    box-shadow: ${shadows.standard};
    border: none;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s ease all;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`
);
const StyledIcon = styled.img`
	width: 30px;
	height: 30px;
`;
