import connectMongo from '../../../models/utils/connectMongo';
import { Event } from '../../../models/Event';
import { User } from '../../../models/User';
import { List, ListItem } from '../../../models/List';

const eventApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		//FIXME: without this code, we get a 'MissingSchema' error: https://github.com/Automattic/mongoose/issues/12718
		await List.findOne({});
		await ListItem.findOne({});
		await User.findOne({});

		const event = await Event.findById(req.query.eventId)
			.populate('creator')
			.populate('collaborators')
			.populate('pendingCollaborators')
			.populate({
				path: 'lists',
				populate: {
					path: 'creator',
				},
			})
			.populate({
				path: 'lists',
				populate: {
					path: 'items',
					populate: {
						path: 'resolvedBy',
					},
				},
			});
		res.json({ status: 200, data: event });
	}

	if (req.method === 'DELETE') {
		//Delete it from all collaborators' events and invites arrays
		const event = await Event.findById(req.body.eventId).populate({
			path: 'collaborators',
		});
		event.collaborators.forEach(async (collaborator) => {
			const user = await User.findById(collaborator._id);
			const newUserEvents = user.events.filter(
				(event) => event._id.toString() !== req.body.eventId
			);
			user.events = newUserEvents;
			await user.save();
		});
		event.pendingCollaborators.forEach(async (collaborator) => {
			const user = await User.findById(collaborator._id);
			const newUserInvites = user.invites.filter(
				(event) => event._id.toString() !== req.body.eventId
			);
			user.invites = newUserInvites;
			await user.save();
		});

		//Delete any lists & listItems in the event
		await ListItem.deleteMany({ event: req.body.eventId });
		await List.deleteMany({ event: req.body.eventId });

		//Delete the event
		const deletedEvent = await Event.deleteOne({
			_id: req.body.eventId,
		});

		res.send({
			status: 200,
			data: deletedEvent,
		});
	}

	if (req.method === 'PUT' && req.body.action === 'anonymous-mode-toggle') {
		const event = await Event.findById(req.body.eventId);
		const value = event?.controls?.anonymousModeIsOn;
		event.controls.anonymousModeIsOn = !value;
		event.save();
		res.json({ status: 200, data: event });
	}
};

export default eventApiRoutes;
