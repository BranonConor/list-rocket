import connectMongo from '../../../models/utils/connectMongo';
import { User } from '../../../models/User';

const userApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		const user = await User.findById(req.query.id.trim());
		res.json({ status: 200, data: user });
	}

	/* ----- USER UPDATES ----- */
	if (req.method === 'PUT' && req.body.action === 'remove-collaborator') {
		//find the user object we want to remove as a collaborator
		const user = await User.findById(req.body.userId);

		if (!user) {
			res.status(404).send({
				success: false,
				error: { message: 'user not found' },
			});
		} else {
			if (user.events.includes(req.body.eventId)) {
				//remove the event from this user's events list
				const newEvents = user.events.filter(
					(event) => event._id.toString() !== req.body.eventId
				);
				user.events = newEvents;
			} else if (user.invites.includes(req.body.eventId)) {
				//remove the event from this user's events list
				const newInvites = user.invites.filter(
					(event) => event._id.toString() !== req.body.eventId
				);
				user.invites = newInvites;
			} else {
				res.status(404).send({
					success: false,
					error: { message: 'event not found for this user' },
				});
			}

			//save everything
			await user.save();
			return res.status(200).send();
		}
	}
};

export default userApiRoutes;
