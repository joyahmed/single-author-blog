import connectDB from '@/config/connectDB';
import Posts from '@/models/postModel';

connectDB();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			//console.log('request received');
			await getPostsByCategory(req, res);
			break;
	}
}

const getPostsByCategory = async (req, res) => {
	try {
		const { category } = req.query;
		//const catName = req.query.cat;
		//console.log('request from api method =>', category);
		const posts = await Posts.find({ category });
		//console.log(posts);
		res.json(posts);
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
