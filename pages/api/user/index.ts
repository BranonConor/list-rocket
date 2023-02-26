import clientPromise from '../../../lib/mongodb';

const usersApiRoutes = async (req, res) => {
	const client = await clientPromise;
	const db = client.db('list-rocket');

	if (req.method === 'GET') {
		const user = await db
			.collection('users')
			.findOne({ email: req.query.email });
		res.json({ status: 200, data: user });
	}
};

export default usersApiRoutes;
