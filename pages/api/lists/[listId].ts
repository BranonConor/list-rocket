import connectMongo from '../../../models/utils/connectMongo';
import { List, ListItem } from '../../../models/List';

const listApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'DELETE') {
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
};

export default listApiRoutes;
