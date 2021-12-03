import connectDB from '@/config/connectDB';
import Posts from '@/models/postModel';

import cloudinary from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

connectDB();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			//console.log('request received');
			await getPost(req, res);
			break;

		case 'PUT':
			await editPost(req, res);
			//console.log('Reuqest received');
			break;

		case 'DELETE':
			console.log('delete request');
			await deletePost(req, res);
			break;
	}
}

const getPost = async (req, res) => {
	try {
		const { id } = req.query;
		//console.log('request from api method =>', id);
		const post = await Posts.findById(id);
		//console.log(post);
		res.json(post);
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

const editPost = async (req, res) => {
	try {
		const { id } = req.query;
		//console.log('request from api method =>', id);
		const post = await Posts.findByIdAndUpdate(id, req.body, {
			new: true
		});
		//console.log(post)
		res.json(post);
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

const deletePost = async (req, res) => {
	try {
		//console.log('delete request');
		const { id } = req.query;
		const post = await Posts.findByIdAndDelete(id);

		//console.log(post.image);
		if (post.image && post.image.public_id) {
			const image = await cloudinary.v2.uploader.destroy(
				post.image.public_id
			);
		}
		res.json({ ok: true });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
