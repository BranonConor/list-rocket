import { pusherClient } from '../../../lib/pusher';
import { User } from '../../../models/User';

export default async function handler(req, res) {
	//event routes
	if (req.body.action === 'event-update') {
		await pusherClient.trigger(
			`event-channel-${req.body.eventId}`,
			`event-channel-update-${req.body.eventId}`,
			{
				eventId: req.body.eventId,
				user: req.body.user,
				//Many different components call this route to update the event. This
				//subAction value helps specify where the call comes from
				subAction: req.body.subAction,
				anonymousModeIsOn: req.body.anonymousModeIsOn,
			}
		);

		res.json({ message: 'completed' });
	}

	//invite routes
	if (req.body.action === 'user-invite') {
		await pusherClient.trigger(
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
		if (!user) {
			res.status(404).send({
				success: false,
				error: { message: 'user not found' },
			});
		} else {
			await pusherClient.trigger(
				`user-channel-${user._id}`,
				`user-channel-update-${user._id}`,
				{
					user: user,
				}
			);

			res.json({ message: 'completed' });
		}
	}
	if (req.body.action === 'remove-collaborator') {
		const user = await User.findById(req.body.userId);
		await pusherClient.trigger(
			`user-channel-${user._id}`,
			`user-channel-update-${user._id}`,
			{
				user: user,
			}
		);

		res.json({ message: 'completed' });
	}
}
