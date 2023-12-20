import connectMongo from '../../../models/utils/connectMongo';
import { Event } from '../../../models/Event';
import { User } from '../../../models/User';
import { List, ListItem } from '../../../models/List';

const eventApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		//FIXME: without this code, we get a 'MissingSchema' error: https://github.com/Automattic/mongoose/issues/12718
		await List.findOne({});
		await ListItem.findOne({});
		await User.findOne({});

		const event = await Event.findById(req.query.eventId)
			.populate('creator')
			.populate('collaborators')
			.populate('pendingCollaborators')
			.populate({
				path: 'lists',
				populate: {
					path: 'creator',
				},
			})
			.populate({
				path: 'lists',
				populate: {
					path: 'items',
					populate: {
						path: 'resolvedBy',
					},
				},
			});
		res.json({ status: 200, data: event });
	}

	if (req.method === 'DELETE') {
		//Delete it from all collaborators' events and invites arrays
		const event = await Event.findById(req.body.eventId).populate({
			path: 'collaborators',
		});
		event.collaborators.forEach(async (collaborator) => {
			const user = await User.findById(collaborator._id);
			const newUserEvents = user.events.filter(
				(event) => event._id.toString() !== req.body.eventId
			);
			user.events = newUserEvents;
			await user.save();
		});
		event.pendingCollaborators.forEach(async (collaborator) => {
			const user = await User.findById(collaborator._id);
			const newUserInvites = user.invites.filter(
				(event) => event._id.toString() !== req.body.eventId
			);
			user.invites = newUserInvites;
			await user.save();
		});

		//Delete any lists & listItems in the event
		await ListItem.deleteMany({ event: req.body.eventId });
		await List.deleteMany({ event: req.body.eventId });

		//Delete the event
		const deletedEvent = await Event.deleteOne({
			_id: req.body.eventId,
		});

		res.send({
			status: 200,
			data: deletedEvent,
		});
	}

	/*------ EVENT UPDATES --------*/

	// EVENT EDITS
	if (req.method === 'PUT') {
		// ---- EVENT UI CONFIGURATIONS ---
		if (req.body.action === 'anonymous-mode-toggle') {
			const event = await Event.findById(req.body.eventId);
			const value = event?.controls?.anonymousModeIsOn;
			event.controls.anonymousModeIsOn = !value;
			event.save();
			res.json({ status: 200, data: event });
		}
		if (req.body.action === 'list-height-change') {
			const event = await Event.findById(req.query.eventId);
			event.controls.listHeight = req.body.listHeight;
			event.save();
			res.json({ status: 200, data: event });
		}
		if (req.body.action === 'event-info-update') {
			await Event.findOneAndUpdate(
				{ _id: req.body.eventId },
				{ ...req.body.data }
			);
			res.status(200).send();
		}
		if (req.body.action === 'delete-list') {
			const event = await Event.findById(req.body.eventId);
			//cleanup the event lists
			const newEventLists = event.lists.filter(
				(list) => list._id.toString() !== req.body.listId.toString()
			);
			event.lists = newEventLists;
			event.save();
			res.json({ status: 200, data: event });
		}

		// ---- EVENT BLOCK UPDATES ----
		if (req.body.action === 'create-list') {
			const newList = new List();
			newList.items = [];
			newList.event = req.body.eventId;

			const event = await Event.findById(req.body.eventId);
			event.lists.push(newList.id);
			newList.save();
			event.save();

			res.json({ status: 200, data: { event: event, newList: newList } });
		}

		// ---- COLLABORATOR UPDATES ----
		if (req.body.action === 'invite') {
			//find the user object we want to add as a collaborator
			const user = await User.findOne({ email: req.body.email });

			if (!user) {
				res.status(404).send({
					success: false,
					error: { message: 'user not found' },
				});
			} else {
				//find the event this request comes from
				const event = await Event.findById(req.query.eventId);
				//check for the user before doing anything else
				const userIsCollaborator = await event.collaborators.includes(
					user._id
				);
				const userIsPendingCollaborator = event.pendingCollaborators
					? await event.pendingCollaborators?.includes(user._id)
					: false;
				if (userIsCollaborator || userIsPendingCollaborator) {
					res.status(404).send({
						success: false,
						error: { message: 'user already exists' },
					});
					return false;
				} else {
					//proceed with updating the event with the new pending collaborator
					if (event.pendingCollaborators) {
						await event.pendingCollaborators.push(user._id);
					} else {
						event.pendingCollaborators = [user._id];
					}
					await event.save();
					return res.status(200).send();
				}
			}
		}
		if (req.body.action === 'remove-collaborator') {
			//find the user object we want to remove as a collaborator
			const user = await User.findById(req.body.userId);

			if (!user) {
				res.status(404).send({
					success: false,
					error: { message: 'user not found' },
				});
			} else {
				//find the event this request comes from
				const event = await Event.findById(req.body.eventId);

				//check for the user before doing anything else
				const userIsCollaborator = event.collaborators.includes(
					user._id
				);
				const userIsPendingCollaborator = event.pendingCollaborators
					? event.pendingCollaborators?.includes(user._id)
					: false;

				if (userIsCollaborator) {
					//remove them from the event collaborators list
					const newCollaborators = event.collaborators.filter(
						(user) => user._id.toString() !== req.body.userId
					);
					event.collaborators = newCollaborators;
					//unassign any lists / items they're assigned to in the event
					event.lists.forEach(async (list) => {
						const foundList = await List.findById(list._id);
						//if the list creator matches the user id, reset it
						if (
							foundList.creator?._id.toString() ===
							req.body.userId
						) {
							foundList.creator = null;
						}
						foundList.save();
					});
				} else if (userIsPendingCollaborator) {
					const newPendingCollaborators =
						event.pendingCollaborators.filter(
							(user) => user._id.toString() !== req.body.userId
						);
					event.pendingCollaborators = newPendingCollaborators;
				} else {
					res.status(404).send({
						success: false,
						error: { message: 'user not found in this event' },
					});
				}

				//save everything
				await event.save();
				return res.status(200).send();
			}
		}
		if (req.body.action === 'accept-invite') {
			//find the event
			const event = await Event.findById(req.query.eventId);
			if (!event) {
				res.status(404).send({
					success: false,
					error: { message: 'event not found' },
				});
			} else {
				//find the user and remove them from event's pendingCollab list
				const newPendingCollaborators =
					event.pendingCollaborators.filter(
						(user: any) => user.toString() !== req.body.user._id
					);
				event.pendingCollaborators = newPendingCollaborators;

				//push the user into the official collaborators list
				event.collaborators.push(req.body.user);
				event.save();
				return res.status(200).send();
			}
		}
		if (req.body.action === 'decline-invite') {
			//find the user object we want to add as a collaborator
			const event = await Event.findById(req.query.eventId);
			if (!event) {
				res.status(404).send({
					success: false,
					error: { message: 'event not found' },
				});
			} else {
				//find the invite and remove it from event's pendingCollab list
				const newPendingCollaborators =
					await event.pendingCollaborators.filter(
						(user: any) => user.toString() !== req.body.user._id
					);
				event.pendingCollaborators = newPendingCollaborators;
				await event.save();
				return res.status(200).send();
			}
		}
	}
};

export default eventApiRoutes;
