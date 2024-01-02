import styled from 'styled-components';
import { PrimaryButton } from './buttons/PrimaryButton';
import { motion } from 'framer-motion';
import { Text } from './typography/Text';
import { Title } from './typography/Title';
import { Dispatch, SetStateAction } from 'react';
import { SecondaryButton } from './buttons/SecondaryButton';

interface IProps extends React.DialogHTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
	cta?: ((e: any) => Promise<void>) | ((e: any) => void);
	buttonText: string;
	setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
	showCancelButton?: boolean;
	maxWidth?: string;
}

export const Dialog: React.FC<IProps> = (props) => {
	const {
		cta,
		buttonText,
		title,
		description,
		setDialogIsOpen,
		showCancelButton,
		children,
		maxWidth = '500px',
	} = props;

	return (
		<StyledDialogWrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.15,
				type: 'spring',
			}}>
			<StyledDialogOverlay
				onClick={() => setDialogIsOpen(false)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: 0.3,
					type: 'spring',
				}}
			/>
			<StyledDialog
				maxWidth={maxWidth}
				initial={{ scale: 0.7, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{
					duration: 0.25,
					type: 'spring',
				}}>
				<Title variant='heading2'>{title}</Title>
				<Text variant='body1'>{description}</Text>
				{children}
				<StyledButtonGroup>
					<PrimaryButton
						variant='small'
						content={buttonText}
						onClick={cta ? cta : () => setDialogIsOpen(false)}
					/>
					{showCancelButton && (
						<SecondaryButton
							variant='small'
							content='Cancel'
							onClick={() => setDialogIsOpen(false)}
						/>
					)}
				</StyledButtonGroup>
			</StyledDialog>
		</StyledDialogWrapper>
	);
};

const StyledDialogWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const StyledDialogOverlay = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.5);
`;
interface StyledDialogProps {
	maxWidth: string;
}
const StyledDialog = styled(motion.div)<StyledDialogProps>(
	({ maxWidth, theme: { colors, shadows } }) => `
    position: absolute;
	z-index: 1;
	width: 100%;
	max-width: ${maxWidth};
	display: flex;
	flex-direction: column;
    background: ${colors.white};
    border-radius: 10px;
    padding: 16px 32px 32px 32px;
    box-sizing: border-box;
	box-shadow: ${shadows.standard};

	@media only screen and (max-width: 1000px) {
		max-width: 90%;
	}
	@media only screen and (max-width: 768px) {
		width: 75%;
	}
	@media only screen and (max-width: 600px) {
		width: calc(100% - 32px);
		max-width: calc(100% - 32px);
	}
`
);
const StyledButtonGroup = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	align-items: center;
	margin: 24px 0 0 0;

	button:nth-of-type(2) {
		margin-left: 16px;
	}
`;
