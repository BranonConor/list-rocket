import connectMongo from '../../../models/utils/connectMongo';
import { List, ListItem } from '../../../models/List';

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

	if (req.method === 'PUT' && req.body.action === 'reorder-list') {
		//find this list
		const list = await List.findById(req.body.listId);
		list.items = req.body.newItems;
		await list.save();
		return res.status(200).send();
	}

	if (req.method === 'DELETE') {
		if (req.body.action === 'delete-list') {
			//Delete all of its items
			const deletedListItems = await ListItem.deleteMany({
				list: req.query.listId,
			});

			//Delete the list itself
			const deletedList = await List.deleteOne({
				_id: req.query.listId,
			});

			res.send({
				status: 200,
				data: { deletedList, deletedListItems },
			});
		}
	}
};

export default listApiRoutes;
