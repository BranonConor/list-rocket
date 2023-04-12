import { User } from '../../../models/User';
import connectMongo from '../../../models/utils/connectMongo';

const usersApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'GET') {
		const user = await User.findOne({ email: req.query.email });
		res.json({ status: 200, data: user });
	}
};

export default usersApiRoutes;
