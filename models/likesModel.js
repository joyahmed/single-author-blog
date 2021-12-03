import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const likeSchema = new mongoose.Schema(
	{
		likedBy: {
			name: String,
			required: true
		},
		name: {
			type: String,
			required: true,
			trim: true
		}
	},
	{ timestamps: true }
);

let Dataset =
	mongoose.models.likes || mongoose.model('Likes', likeSchema);
