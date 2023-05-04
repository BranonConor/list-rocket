import styled from 'styled-components';

interface IProps {
	children: React.ReactNode;
}

export const SectionContainer: React.FC<IProps> = (props) => {
	const { children } = props;
	return (
		<StyledWrapper>
			<StyledSectionContainer>{children}</StyledSectionContainer>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 0 32px;
	box-sizing: border-box;

	@media only screen and (max-width: 600px) {
		padding: 0 16px;
	}
`;
const StyledSectionContainer = styled.div`
	max-width: 1100px;
	width: 100%;
`;
