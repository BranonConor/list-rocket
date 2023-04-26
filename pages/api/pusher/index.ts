import { pusherClient } from '../../../lib/pusher';
import { User } from '../../../models/User';

export default async function handler(req, res) {
	//event routes
	if (req.body.action === 'event-update') {
		const response = await pusherClient.trigger(
			`event-channel-${req.body.event._id}`,
			`event-channel-update-${req.body.event._id}`,
			{
				event: req.body.event,
				user: req.body.user,
			}
		);

		res.json({ message: 'completed' });
	}

	//invite routes
	if (req.body.action === 'user-invite') {
		const response = await pusherClient.trigger(
			`user-channel-${req.body.user._id}`,
			`user-channel-update-${req.body.user._id}`,
			{
				user: req.body.user,
			}
		);

		res.json({ message: 'completed' });
	}
	if (req.body.action === 'send-invite') {
		const user = await User.findOne({ email: req.body.userEmail });
		const response = await pusherClient.trigger(
			`user-channel-${user._id}`,
			`user-channel-update-${user._id}`,
			{
				user: user,
			}
		);

		res.json({ message: 'completed' });
	}
}
