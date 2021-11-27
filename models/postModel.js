import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		slug: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		image: {
			url: String,
			public_id: String
		},
		category: {
			type: String,
			required: true
		},
		comments: [{ type: ObjectId, ref: 'comments' }],
		likes: [{ type: ObjectId, ref: 'likes' }]
	},

	{ timestamps: true }
);

let Dataset =
	mongoose.models.posts || mongoose.model('posts', postSchema);

export default Dataset;
