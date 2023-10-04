import connectMongo from '../../../models/utils/connectMongo';
import { List, ListItem } from '../../../models/List';
import { User } from '../../../models/User';

const listApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'PUT' && req.body.action === 'assign-user-to-list') {
		//look up the list
		const list = await List.findById(req.body.listId);
		//update the creator field, clear any custom creator values
		list.creator = req.body.user;
		list.customCreator = null;
		//save
		list.save();

		res.send({
			status: 200,
			data: list,
		});
	}

	if (req.method === 'PUT' && req.body.action === 'add-custom-list-creator') {
		//look up the list
		const list = await List.findById(req.body.listId);
		//update the creator field, clear any collaborator creator values
		list.customCreator = req.body.name;
		list.creator = null;
		//save
		list.save();

		res.send({
			status: 200,
			data: list,
		});
	}

	if (req.method === 'PUT' && req.body.action === 'check') {
		//find the user object we want to add as the resolver of this item
		const user = await User.findOne({ email: req.body.data.userEmail });
		if (!user) {
			res.status(404).send({
				success: false,
				error: { message: 'user not found' },
			});
		} else {
			//find this list
			const listItem = await ListItem.findById(req.body.data.listItemId);
			if (listItem.resolvedBy) {
				res.status(404).send({
					success: false,
					error: { message: 'item already resolved' },
				});
				return false;
			} else {
				//proceed with updating the list item with the new resolver
				listItem.resolvedBy = user._id;
				await listItem.save();
				return res.status(200).send();
			}
		}
	}

	if (req.method === 'PUT' && req.body.action === 'uncheck') {
		//find this list
		const listItem = await ListItem.findById(req.body.data.listItemId);
		listItem.resolvedBy = null;
		await listItem.save();
		return res.status(200).send();
	}

	if (req.method === 'DELETE') {
		if (req.body.action === 'delete-list') {
			//Delete all of its items
			const deletedListItems = await ListItem.deleteMany({
				list: req.body.listId,
			});

			//Delete the list itself
			const deletedList = await List.deleteOne({
				_id: req.body.listId,
			});

			res.send({
				status: 200,
				data: { deletedList, deletedListItems },
			});
		}

		if (req.body.action === 'delete-list-item') {
			//Delete it from its respective list
			const list = await List.findById(req.body.listId);
			const newListItems = await list.items.filter(
				(item) => item._id.toString() !== req.body.listItemId
			);
			list.items = newListItems;
			await list.save();

			//Delete the list item itself
			const deletedListIem = await ListItem.deleteOne({
				_id: req.body.listItemId,
			});

			res.send({
				status: 200,
				data: deletedListIem,
			});
		}
	}
};

export default listApiRoutes;
