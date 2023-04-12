import connectMongo from '../../../models/utils/connectMongo';
import { User } from '../../../models/User';

const userApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		const user = await User.findById(req.query.id.trim());
		res.json({ status: 200, data: user });
	}
};

export default userApiRoutes;
