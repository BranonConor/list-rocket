import connectMongo from '../../../models/utils/connectMongo';

const pollApiRoutes = async (req, res) => {
	//mongoose code
	await connectMongo();
};

export default pollApiRoutes;
