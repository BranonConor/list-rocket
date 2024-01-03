import connectMongo from '../../../models/utils/connectMongo';
import { Poll } from '../../../models/Poll';
import { _id } from '@next-auth/mongodb-adapter';

const pollApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();

	if (req.method === 'PUT') {
		// ---- POLL UPDATES ---
		if (req.body.action === 'vote') {
			const poll = await Poll.findById(req.query.pollId);
			//if votes are empty, add the first one
			if (poll.votes.length === 0) {
				poll.votes.push({ ...req.body.vote });
			} else {
				let userHasVote = false;
				//otherwise loop through votes and overwrite existing vote OR add new one for this user
				poll.votes.forEach((vote) => {
					if (vote.user.toString() === req.body.userId) {
						userHasVote = true;
						vote.option = req.body.vote.option;
					}
				});
				if (!userHasVote) {
					poll.votes.push({ ...req.body.vote });
				}
			}
			poll.save();
			res.json({ status: 200, data: poll });
		}
	}
};

export default pollApiRoutes;
