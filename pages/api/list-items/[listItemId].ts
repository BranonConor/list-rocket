import connectMongo from '../../../models/utils/connectMongo';
import { List, ListItem } from '../../../models/List';
import { User } from '../../../models/User';

const listItemApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'DELETE') {
		//Delete it from its respective list
		const list = await List.findById(req.body.listId);
		const newListItems = await list.items.filter(
			(item) => item._id.toString() !== req.query.listItemId
		);
		list.items = newListItems;
		await list.save();

		//Delete the list item itself
		const deletedListIem = await ListItem.deleteOne({
			_id: req.query.listItemId,
		});

		res.send({
			status: 200,
			data: deletedListIem,
		});
	}

	if (req.method === 'PUT') {
		if (req.body.action === 'check') {
			//find the user object we want to add as the resolver of this item
			const user = await User.findOne({ email: req.body.data.email });
			if (!user) {
				res.status(404).send({
					success: false,
					error: { message: 'user not found' },
				});
			} else {
				//find this list
				const listItem = await ListItem.findById(req.query.listItemId);
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

		if (req.body.action === 'uncheck') {
			//find this list
			const listItem = await ListItem.findById(req.query.listItemId);
			console.log(listItem);
			listItem.resolvedBy = null;
			await listItem.save();
			return res.status(200).send();
		}
	}
};

export default listItemApiRoutes;
