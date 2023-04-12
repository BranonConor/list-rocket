import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import connectMongo from '../../../models/utils/connectMongo';
import { Event } from '../../../models/Event';
import { User } from '../../../models/User';
import { List } from '../../../models/List';

const eventsApiRoutes = async (req, res) => {
	const client = await clientPromise;
	const db = client.db('list-rocket');

	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		try {
			//get user and populate their events, return events
			const currentUser = await User.findById(req.query.id).populate(
				'events'
			);
			res.json({ status: 200, data: currentUser.events });
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
			//Save everything
			await newEvent.save();
			await creator.save();
			res.send(newEvent.status);
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	}

	if (req.method === 'PUT') {
		//find the user object we want to add as a collaborator
		const user = await db
			.collection('users')
			.findOne({ email: req.body.email });
		if (!user) {
			res.status(404).send({
				success: false,
				error: { message: 'user not found' },
			});
		} else {
			//find an event where the user is not already a collaborator or creator
			const event = await db.collection('events').findOne({
				_id: new ObjectId(req.body.eventId.trim()),
			});
			//check for the user before doing anything else
			const collaborators = [];
			await event.collaborators.forEach((collaborator) => {
				collaborators.push(collaborator.email);
			});
			const userExists = await collaborators.includes(user.email);
			if (userExists) {
				res.status(404).send({
					success: false,
					error: { message: 'user already exists' },
				});
				return false;
			} else {
				//proceed with updating the event with the new collaborator if none exist already
				const eventUpdate = db.collection('events').findOneAndUpdate(
					{
						_id: new ObjectId(req.body.eventId.trim()),
						collaborators: { $ne: user },
					},
					{ $push: { collaborators: user } }
				);
				return res.send(eventUpdate.status);
			}
		}
	}
};

export default eventsApiRoutes;
