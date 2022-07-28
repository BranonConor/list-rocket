import { ReactNode } from 'react';
import styled from 'styled-components';
import { TITLE_COMPONENTS } from './contants';

interface Props {
	children: ReactNode;
	variant:
		| 'heading1'
		| 'heading2'
		| 'heading3'
		| 'heading4'
		| 'heading5'
		| 'heading6'
		| 'subtitle1'
		| 'subtitle2';
}

export const Title: React.FC<Props> = ({ children, variant }: Props) => {
	//Dynamically choose the type of HTML element to render based on the variant and its mapping
	//in the TITLE_COMPONENTS enum
	const TitleElement = TITLE_COMPONENTS[
		variant
	] as keyof JSX.IntrinsicElements;

	//Style that custom element
	interface StyleProps {
		variant: string;
	}
	const StyledTitle = styled(TitleElement)<StyleProps>(
		({ variant, theme: { typography } }) => `
		fontFamily: ${typography.fonts[variant]};
		fontWeight: ${typography.weights[variant]};
		fontSize: ${typography.sizes[variant]};
		lineHeight: ${typography.lineHeights[variant]};
		letterSpacing: ${typography.letterSpacing[variant]};
	`
	);

	//Render it with children!
	return <StyledTitle variant={variant}>{children}</StyledTitle>;
};
