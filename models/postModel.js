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
			required: true,
			unique: true
		},
		comments: [
			{
				commentContent: {
					type: String
				},
				created: { type: Date, default: Date.now },
				commentBy: {
					type: String
				},
				userImage: {
					type: String
				}
			}
		],
		hearts: [
			{
				heartBy: {
					type: String
				},
				userImage: {
					type: String
				},
				userEmail: {
					type: String
				}
			}
		]
	},

	{ timestamps: true }
);

let Dataset =
	mongoose.models.posts || mongoose.model('posts', postSchema);

export default Dataset;
