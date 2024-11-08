import { EventCard } from '../cards/EventCard';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { EventContext } from '../../contexts/EventContext';
import { Title } from '../typography/Title';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import { Dialog } from '../Dialog';
import { CreateEventButton } from './CreateEventButton';
import { CreateEventForm } from './CreateEventForm';
import { useDeleteEventMutation } from '../../hooks/mutations/useDeleteEventMutation';

export const AllEvents: React.FC = () => {
	const { events, isLoading: isLoadingEvents } = useContext(EventContext);
	const { currentEvent, clearWorkspace } = useContext(WorkspaceContext);
	const { user } = useContext(UserContext);
	const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
	const [eventToDelete, setEventToDelete] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const [userIsCreatingEvent, setUserIsCreatingEvent] = useState(false);
	const { mutate: deleteEvent, isLoading } = useDeleteEventMutation();

	//Deleting an event
	const handleDelete = async (
		e: any,
		event: { id: string; name: string }
	) => {
		e?.preventDefault();
		try {
			deleteEvent({
				eventId: event.id,
				user: user,
			});

			setDeleteDialogIsOpen(false);
			currentEvent?._id === event.id && clearWorkspace();
			toast.success('Successfully deleted your event 🗑', {
				toastId: 'delete-event-toast',
			});
			setEventToDelete(null);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, sorry! 😵‍💫', {
				toastId: 'error-delete-event-toast',
			});
		}
	};

	const handleCreateEventClick = (event: any) => {
		event.preventDefault();
		setUserIsCreatingEvent(true);
	};

	return (
		<StyledWrapper>
			<Title variant='heading2'>Your Events</Title>
			<StyledEventsContainer>
				{events?.length ? (
					<>
						{events.map((event, index) => {
							return (
								<EventCard
									name={event.name}
									description={event.description}
									creator={event.creator}
									id={event._id}
									key={event._id}
									animationFactor={index}
									setDeleteDialogIsOpen={
										setDeleteDialogIsOpen
									}
									setEventToDelete={setEventToDelete}
									isLoading={
										(isLoading || isLoadingEvents) &&
										event._id === eventToDelete?.id
									}
								/>
							);
						})}
						{userIsCreatingEvent ? (
							<CreateEventForm
								setUserIsCreatingEvent={setUserIsCreatingEvent}
							/>
						) : (
							<CreateEventButton
								onClick={handleCreateEventClick}
							/>
						)}
					</>
				) : userIsCreatingEvent ? (
					<CreateEventForm
						setUserIsCreatingEvent={setUserIsCreatingEvent}
					/>
				) : (
					<CreateEventButton onClick={handleCreateEventClick} />
				)}
			</StyledEventsContainer>
			{deleteDialogIsOpen && (
				<Dialog
					title='Delete Event'
					description={`Are you sure you want to delete ${eventToDelete?.name}?`}
					cta={(e: any) => handleDelete(e, eventToDelete)}
					buttonText='Delete'
					setDialogIsOpen={setDeleteDialogIsOpen}
					showCancelButton
				/>
			)}
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 0 0 16px 0;
	box-sizing: border-box;
`;
const StyledEventsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 16px;
	width: 100%;

	@media only screen and (max-width: 1230px) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media only screen and (max-width: 960px) {
		grid-template-columns: 1fr 1fr;
	}

	@media only screen and (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;
