import connectMongo from '../../../models/utils/connectMongo';
import { ListItem } from '../../../models/List';

const listItemsApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'PUT') {
		//find list item in question and update it
		await ListItem.findOneAndUpdate(
			{ _id: req.body.listItemId },
			{ ...req.body.data }
		);
		res.status(200).send();
	}
};

export default listItemsApiRoutes;
