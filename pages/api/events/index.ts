import connectMongo from '../../../models/utils/connectMongo';
import { Event } from '../../../models/Event';
import { User } from '../../../models/User';

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
			const newEvent = new Event({ ...req.body.event });
			newEvent.collaborators = [
				{
					...req.body.user,
				},
			];
			//Add this event to the creator's list of events
			const creator = await User.findById(req.body.user._id);
			creator.events.push(newEvent._id);
			//Add this creator to the event as well
			newEvent.creator = creator._id;
			//Save everything
			await newEvent.save();
			await creator.save();
			res.status(200).send(newEvent);
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	}
};

export default eventsApiRoutes;
