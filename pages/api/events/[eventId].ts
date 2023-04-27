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
		//Delete it from the user's events array
		const user = await User.findById(req.body.user._id);
		const newUserEvents = await user.events.filter(
			(event) => event._id.toString() !== req.body.eventId
		);
		user.events = newUserEvents;
		await user.save();

		//Delete the event
		const deletedEvent = await Event.deleteOne({
			_id: req.body.eventId,
		});

		res.send({
			status: 200,
			data: deletedEvent,
		});
	}
};

export default eventApiRoutes;
