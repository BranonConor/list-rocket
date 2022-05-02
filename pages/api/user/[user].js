import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
	const client = await clientPromise;
	const db = client.db('list-rocket');

	if (req.method === 'GET') {
		const user = await db
			.collection('users')
			.findOne({ _id: ObjectId(req.query.id.trim()) });
		res.json({ status: 200, data: user });
	}
};
