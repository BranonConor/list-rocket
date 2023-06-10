import styled from 'styled-components';
import { Text } from '../typography/Text';

interface IProps {
	onClick: (event: any) => void;
}

export const CreateEventButton: React.FC<IProps> = (props) => {
	const { onClick } = props;

	return (
		<StyledButton type='button' onClick={onClick}>
			<img src='/icons/create-new.svg' alt='' />
			<Text variant='button'>CREATE EVENT</Text>
		</StyledButton>
	);
};

const StyledButton = styled.button(
	({ theme: { colors, shadows } }) => `
    min-height: 200px;
    background: ${colors.white}; 
    border: 2px dashed ${colors.bgLight};
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.15s ease all;

    p {
        margin-bottom: 0;
    }
    
    &:hover {
        opacity: 0.75;
        box-shadow: ${shadows.standard};
        transform: translateY(-4px);
    }

    @media only screen and (max-width: 600px) {
        min-height: 128px;
    }
`
);
