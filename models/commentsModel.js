import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
	{
		commentBy: {
			type: String,
			required: true
		},
		commentContent: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

let Dataset =
	mongoose.models.comments ||
	mongoose.model('comments', commentSchema);

export default Dataset;
