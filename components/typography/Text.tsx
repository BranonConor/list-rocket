import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	children: ReactNode;
	variant: 'body1' | 'body2' | 'button' | 'caption' | 'overline';
}

export const Text: React.FC<Props> = ({ children, variant }: Props) => {
	return <StyledP variant={variant}>{children}</StyledP>;
};

interface StyleProps {
	variant: string;
}
const StyledP = styled.p<StyleProps>(
	({ variant, theme: { typography } }) => `
    fontFamily: ${typography.fonts[variant]};
    fontWeight: ${typography.weights[variant]};
    fontSize: ${typography.sizes[variant]};
    lineHeight: ${typography.lineHeights[variant]};
    letterSpacing: ${typography.letterSpacing[variant]};
`
);
