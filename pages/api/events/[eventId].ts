import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import connectMongo from '../../../models/utils/connectMongo';
import { Event } from '../../../models/Event';
import { User } from '../../../models/User';

const eventApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		console.log('Event id: ', req.query.id);
		const event = await Event.findById(req.query.id)
			.populate('creator')
			.populate('collaborators');
		console.log(event);
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
