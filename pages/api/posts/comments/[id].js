import connectDB from '@/config/connectDB';
import Posts from '@/models/postModel';

connectDB();

export default async function handler(req, res) {
	switch (req.method) {
		case 'PUT':
			await deleteComment(req, res);
			console.log('delete reuqest from handler');
			break;
	}
}

const getComments = async (req, res) => {
	try {
		const { postId, comments } = req.body;
		//console.log('request received');
		const data = await Posts.find()
			.sort({ createdAt: -1 })
			.limit(3);
		res.json(comments);
		//console.log(comments);
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

const deleteComment = async (req, res) => {
	try {
		const { postId, comment } = req.body;
		//console.log('[id]: comment from id =>', comment);
		//console.log('[id]: id =>', postId);

		const post = await Posts.findByIdAndUpdate(
			postId,
			{
				$pull: { comments: { _id: comment._id } }
			},
			{ new: true }
		);
		res.json(post);
	} catch (err) {
		console.log(err);
	}
};
