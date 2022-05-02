import clientPromise from '../../../lib/mongodb';

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
		const newEvent = await db.collection('events').insertOne(req.body);
		res.send(newEvent.status);
		// //Add new event to user's array of events
		// const user = await User.findById(req.body.creator);
		// await user.events.push(event._id);
		// await user.save();
		// res.send(req.body.name);
	}
};
