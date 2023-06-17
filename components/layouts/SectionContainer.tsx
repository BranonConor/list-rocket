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
	padding: 64px 0;
	box-sizing: border-box;

	@media only screen and (max-width: 600px) {
		padding: 32px 0;
	}
`;
const StyledSectionContainer = styled.div`
	max-width: 1100px;
	width: 100%;
`;
