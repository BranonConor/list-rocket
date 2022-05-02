import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
	const client = await clientPromise;
	const db = client.db('list-rocket');

	if (req.method === 'GET') {
		const event = await db
			.collection('events')
			.findOne({ _id: ObjectId(`${req.query.id}`) });
		res.json({ status: 200, data: event });
	}

	if (req.method === 'DELETE') {
		const { eventId } = req.query;
		const formattedId = new ObjectId(`${eventId}`);
		const deletedEvent = await db.collection('events').deleteOne({
			_id: formattedId,
		});

		res.send({
			status: 200,
			data: deletedEvent,
		});
		// //Add new event to user's array of events
		// const user = await User.findById(req.body.creator);
		// await user.events.push(event._id);
		// await user.save();
		// res.send(req.body.name);
	}
};
