import { ReactNode } from 'react';

enum TITLE_COMPONENTS {
	'heading1' = 'h1',
	'heading2' = 'h2',
	'heading3' = 'h3',
	'heading4' = 'h4',
	'heading5' = 'h5',
	'heading6' = 'h6',
	'subtitle1' = 'p',
	'subtitle2' = 'p',
}
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
	const TitleElement: keyof JSX.IntrinsicElements = TITLE_COMPONENTS[variant];

	//Render it with children!
	return <TitleElement>{children}</TitleElement>;
};
