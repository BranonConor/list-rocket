import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
	const client = await clientPromise;
	const db = client.db('list-rocket');

	if (req.method === 'GET') {
		const events = await db
			.collection('events')
			.find({ creator: req.query.creatorId })
			.toArray();
		res.json({ status: 200, data: events });
	}

	if (req.method === 'POST') {
		//Create new event with request details
		const newEvent = await db
			.collection('events')
			.insertOne({ ...req.body, collaborators: [] });
		res.send(newEvent.status);
		// //Add new event to user's array of events
		// const user = await User.findById(req.body.creator);
		// await user.events.push(event._id);
		// await user.save();
		// res.send(req.body.name);
	}

	if (req.method === 'PUT') {
		//find the user object we want to add as a collaborator
		const user = await db
			.collection('users')
			.findOne({ email: req.body.email });
		if (!user) {
			res.status(404).send({
				success: false,
				error: { message: 'User not found' },
			});
		} else {
			//find an event where the user is not already a collaborator or creator
			const eventUpdate = await db.collection('events').findOneAndUpdate(
				{
					_id: ObjectId(req.body.eventId.trim()),
					$not: { collaborators: user },
				},
				{ $push: { collaborators: user } }
			);
			res.send(eventUpdate.status);
		}
	}
};
