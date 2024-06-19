import styled from 'styled-components';
import { ICollaborator, IUser } from '../../contexts/types';
import { ProfilePhoto } from '../ProfilePhoto';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Dispatch, SetStateAction, useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { toast } from 'react-toastify';

interface IListUserSelectorProps {
	users: ICollaborator[];
	listId: string;
	setIsUserSelectorOpen: Dispatch<SetStateAction<boolean>>;
	setIsCustomUserInputOn: Dispatch<SetStateAction<boolean>>;
}

export const ListUserSelector: React.FC<IListUserSelectorProps> = ({
	users,
	listId,
	setIsUserSelectorOpen,
	setIsCustomUserInputOn,
}) => {
	const { currentEvent, prepWorkspace } = useContext(WorkspaceContext);

	const handleClick = async (user: ICollaborator) => {
		//put request to list API to update the creator field with this use
		try {
			await axios.put(`/api/lists/${listId}`, {
				eventId: currentEvent._id,
				user: user,
				listId: listId,
				action: 'assign-user-to-list',
			});

			//ping Pusher channel
			await axios.post('/api/pusher', {
				eventId: currentEvent._id,
				user: user,
				action: 'event-update',
			});

			setIsUserSelectorOpen(false);
			prepWorkspace(currentEvent._id);
			toast.success(`Reassigned list 👍🏽`, {
				toastId: 'assigned-list-to-user-toast',
			});
		} catch (axiosError) {
			toast.error(`Something went wrong, sorry! 😵‍💫`, {
				toastId: 'assigned-list-to-user-error-toast',
			});
			console.log(axiosError);
		}
	};

	const handleAddCustomUser = () => {
		setIsCustomUserInputOn(true);
		setIsUserSelectorOpen(false);
	};

	return (
		<>
			<StyledBlanket onClick={() => setIsUserSelectorOpen(false)} />
			<StyledWrapper
				initial={{ opacity: 0, top: -8 }}
				animate={{ opacity: 1, top: 0 }}
				transition={{
					duration: 0.2,
					type: 'spring',
				}}>
				{users.map((user, index) => {
					return (
						<StyledMotionWrapper
							key={user._id}
							initial={{ opacity: 0, top: -16 }}
							animate={{ opacity: 1, top: 0 }}
							transition={{
								duration: 0.25,
								type: 'spring',
							}}
							onClick={() => handleClick(user)}>
							<ProfilePhoto
								photo={user.image}
								dimensions='24px'
							/>
						</StyledMotionWrapper>
					);
				})}
				<StyledIconWrapper>
					<StyledIcon
						id='add-user-icon'
						src='/icons/add-minimal.svg'
						onClick={handleAddCustomUser}
					/>
				</StyledIconWrapper>
			</StyledWrapper>
		</>
	);
};

const StyledWrapper = styled(motion.div)(
	({ theme: { shadows } }) => `
	position: absolute;
	display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	transform: translateY(40px);
	background: white;
	border-radius: 20px;
	height: auto;
    box-shadow: ${shadows.standard};
    z-index: 1000;

    &:hover {

        #add-user-icon {
            filter: grayscale(0);
        }
    }
    `
);
const StyledBlanket = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
`;
const StyledMotionWrapper = styled(motion.div)(
	({ theme: { colors } }) => `
	display: flex;
	align-items: center;
	justify-content: center;    
	margin: 0 0 8px 0;
    border-radius: 20px;
    padding: 4px;
	position: relative;

    &:hover {
        cursor: pointer;
        background: ${colors.chip.defaultBg};
    }
    
	&:last-of-type {
        margin: 0 0 0 0;
	}
    `
);
const StyledIconWrapper = styled.div`
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const StyledIcon = styled.img`
	filter: grayscale(100%);
	transition: 0.15s ease all;
	width: 18px;
	height: 18px;

	&:hover {
		transform: scale(1.15);
		cursor: pointer;
	}
`;
