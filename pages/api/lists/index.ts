import connectMongo from '../../../models/utils/connectMongo';
import { List, ListItem } from '../../../models/List';

const listsApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'PUT') {
		//find list in question
		const list = await List.findById(req.body.listId);
		if (!list) {
			res.status(404).send({
				success: false,
				error: { message: 'list not found' },
			});
		} else {
			const newListItem = new ListItem({ ...req.body.listItem });
			list.items.push(newListItem._id);
			newListItem.save();
			list.save();
			res.status(200).send();
		}
	}
};

export default listsApiRoutes;
