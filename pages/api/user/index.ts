import { User } from '../../../models/User';
import { Event } from '../../../models/Event';
import connectMongo from '../../../models/utils/connectMongo';

const usersApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		const user = await User.findOne({ email: req.query.email }).populate({
			path: 'invites',
			populate: {
				path: 'creator',
			},
		});
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
			const alreadyInvited = await user.invites.includes(event._id);
			if (alreadyInvited) {
				res.status(404).send({
					success: false,
					error: { message: 'user invite is pending' },
				});
				return false;
			} else {
				if (!!user.invites) {
					await user.invites.push(event._id);
				} else {
					user.invites = [event._id];
				}
				await user.save();
				return res.status(200).send();
			}
		}
	}

	if (req.method === 'PUT' && req.body.action === 'decline') {
		//find the user object we want to add as a collaborator
		const user = await User.findOne({ email: req.body.user.email });
		if (!user) {
			res.status(404).send({
				success: false,
				error: { message: 'user not found' },
			});
		} else {
			//find the invite and remove it from user's list
			const newUserInvites = await user.invites.filter(
				(invite: any) => invite.toString() !== req.body.eventId
			);
			user.invites = newUserInvites;
			await user.save();
			return res.status(200).send();
		}
	}
};

export default usersApiRoutes;
