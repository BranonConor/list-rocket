import { User } from '../../../models/User';
import { Event } from '../../../models/Event';
import connectMongo from '../../../models/utils/connectMongo';

const usersApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		const user = await User.findOne({ email: req.query.email });
		res.json({ status: 200, data: user });
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
			//grab the event from which the request was made
			const event = await Event.findById(req.body.eventId);
			//check for the user before doing anything else
			const userExists = await event.collaborators.includes(user.email);
			if (userExists) {
				res.status(404).send({
					success: false,
					error: { message: 'user already exists' },
				});
				return false;
			} else {
				if (user.invites) {
					await user.invites.push(event);
				} else {
					user.invites = [event];
				}
				await user.save();
				console.log('User after adding invite: ', user);
				return res.status(200).send();
			}
		}
	}
};

export default usersApiRoutes;
