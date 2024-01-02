import { Poll } from '../../../models/Poll';
import { Event } from '../../../models/Event';
import connectMongo from '../../../models/utils/connectMongo';

const pollsApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'POST') {
		console.log('PAYLOAD:', req.body);
		try {
			//Create a new poll from req data
			const newPoll = new Poll({ ...req.body });
			//Add this event to the event's list of polls
			const event = await Event.findById(req.body.event._id);
			event.polls.push(newPoll._id);
			//Save everything
			await newPoll.save();
			await event.save();
			res.status(200).send(newPoll);
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	}
};

export default pollsApiRoutes;
