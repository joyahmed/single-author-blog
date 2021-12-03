import connectDB from '@/config/connectDB';
import Posts from '@/models/postModel';

connectDB();

//const { method } = req.method;

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			await getPosts(req, res);
			break;

		case 'POST':
			await createPost(req, res);
			//console.log('Reuqest received');
			break;
	}
}

const getPosts = async (req, res) => {
	try {
		const posts = await Posts.find().sort({ createdAt: -1 });
		res.json(posts);
		//console.log(posts);
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

const createPost = async (req, res) => {
	try {
		const { title, slug, content, category, image } = req.body;

		console.log(title, slug, content, category, image);

		/* 		const categoryExists = await Posts.findOne({ category });
		if (categoryExists) {
			return res.json({
				error: 'Category Exists!'
			});
		} */

		const newPost = new Posts({
			title: title,
			slug: slug,
			content: content,
			category: category,
			image
		});

		await newPost.save();
		await res.json({ msg: 'Success! Created a new post.' });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
