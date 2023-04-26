import { pusherClient } from '../../../lib/pusher';

export default async function handler(req, res) {
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
