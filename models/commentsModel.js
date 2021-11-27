import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
	{
		commentBy: {
			type: String
		},
		content: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.likes ||
	mongoose.model('Comments', commentSchema);
