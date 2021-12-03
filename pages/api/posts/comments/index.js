import connectDB from '@/config/connectDB';
import Posts from '@/models/postModel';
import { getUser } from '@auth0/nextjs-auth0';

connectDB();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			//console.log('comment request received');
			await getComments(req, res);
			break;

		case 'POST':
			await createComment(req, res);
			//console.log('Reuqest received');
			break;
	}
}

const getComments = async (req, res) => {
	try {
		//console.log('request received');
		const comments = await Posts.find()
			.sort({ createdAt: -1 })
			.limit(3);
		res.json(comments);
		//console.log(comments);
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

const createComment = async (req, res) => {
	try {
		const { postId, commentContent, commentBy, userImage } = req.body;
		const post = await Posts.findByIdAndUpdate(
			postId,
			{
				$push: {
					comments: {
						commentContent: commentContent,
						commentBy: commentBy,
						userImage: userImage
					}
				}
			},
			{ new: true }
		);
		await res.json({ msg: 'Comment successfully posted!' });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
