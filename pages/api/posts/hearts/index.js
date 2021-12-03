import connectDB from '@/config/connectDB';
import Posts from '@/models/postModel';

connectDB();

export default async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			await createHeart(req, res);
			//console.log('Reuqest received');
			break;
	}
}

const createHeart = async (req, res) => {
	try {
		const { postId, heartBy, userImage, userEmail } = req.body;

		console.log(
			'postId, heartBy, userImage, userEmail =>',
			postId,
			heartBy,
			userImage,
			userEmail
		);

		const post = await Posts.findByIdAndUpdate(
			postId,
			{
				$push: {
					hearts: {
						heartBy: heartBy,
						userImage: userImage,
						userEmail: userEmail
					}
				}
			},
			{ new: true }
		);
		await res.json({ msg: 'Hearted!' });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
