import connectMongo from '../../../models/utils/connectMongo';
import { Event } from '../../../models/Event';
import { User } from '../../../models/User';
import { List } from '../../../models/List';

const eventsApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		try {
			//get user and populate their events, return events
			const currentUser = await User.findById(req.query.id).populate(
				'events'
			);
			res.json({ status: 200, data: currentUser?.events });
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	}

	if (req.method === 'POST') {
		try {
			//Create a new event from req data
			const newEvent = await new Event({ ...req.body.event });
			newEvent.collaborators = [
				{
					...req.body.user,
				},
			];
			//Create a new list and add it to the event
			const creatorList = await new List({
				creator: req.body.user,
			});
			newEvent.lists = [creatorList];
			//Add this event to the creator's list of events
			const creator = await User.findById(req.body.user._id);
			await creator.events.push(newEvent);
			//Add this creator to the event as well
			newEvent.creator = creator;
			//Save everything
			await creatorList.save();
			await newEvent.save();
			await creator.save();
			res.send(newEvent.status);
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	}

	if (req.method === 'PUT' && req.body.action === 'invite') {
		//find the user object we want to add as a collaborator
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			res.status(404).send({
				success: false,
				error: { message: 'user not found' },
			});
		} else {
			//find the event this request comes from
			const event = await Event.findById(req.body.eventId);
			//check for the user before doing anything else
			const userIsCollaborator = await event.collaborators.includes(user);
			const userIsPendingCollaborator = event.pendingCollaborators
				? await event.pendingCollaborators?.includes(user)
				: false;
			if (userIsCollaborator || userIsPendingCollaborator) {
				res.status(404).send({
					success: false,
					error: { message: 'user already exists' },
				});
				return false;
			} else {
				//proceed with updating the event with the new pending collaborator
				if (event.pendingCollaborators) {
					await event.pendingCollaborators.push(user);
				} else {
					event.pendingCollaborators = [user];
				}
				await event.save();
				return res.status(200).send();
			}
		}
	}

	if (req.method === 'PUT' && req.body.action === 'decline') {
		//find the user object we want to add as a collaborator
		const event = await Event.findById(req.body.eventId);
		if (!event) {
			res.status(404).send({
				success: false,
				error: { message: 'event not found' },
			});
		} else {
			//find the invite and remove it from event's pendingCollab list
			const newPendingCollaborators =
				await event.pendingCollaborators.filter(
					(user: any) => user.toString() !== req.body.user._id
				);
			event.pendingCollaborators = newPendingCollaborators;
			await event.save();
			return res.status(200).send();
		}
	}

	if (req.method === 'PUT' && req.body.action === 'accept') {
		//find the user object we want to add as a collaborator
		const event = await Event.findById(req.body.eventId);
		if (!event) {
			res.status(404).send({
				success: false,
				error: { message: 'event not found' },
			});
		} else {
			//find the user and remove them from event's pendingCollab list
			const newPendingCollaborators =
				await event.pendingCollaborators.filter(
					(user: any) => user.toString() !== req.body.user._id
				);
			event.pendingCollaborators = newPendingCollaborators;
			//push the user into the official collaborators list
			await event.collaborators.push(req.body.user);
			await event.save();
			return res.status(200).send();
		}
	}
};

export default eventsApiRoutes;
