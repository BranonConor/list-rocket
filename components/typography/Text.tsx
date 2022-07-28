import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	children: ReactNode;
	variant: 'body1' | 'body2' | 'button' | 'caption' | 'overline';
}

export const Text: React.FC<Props> = ({ children, variant }: Props) => {
	return <StyledP variant={variant}>{children}</StyledP>;
};

const StyledP = styled.p<Props>(
	({ variant, theme: { typography } }) => `
    font-family: ${typography.font[variant]};
    font-weight: ${typography.weight[variant]};
    font-size: ${typography.size[variant]};
    line-height: ${typography.lineHeight[variant]};
    letter-spacing: ${typography.letterSpacing[variant]};
`
);
