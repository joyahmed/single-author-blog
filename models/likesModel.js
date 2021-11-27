import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const upvoteSchema = new mongoose.Schema(
	{
		upvoteBy: {
			type: String
		}
	},
	{ timestamps: true }
);

export default mongoose.models.likes ||
	mongoose.model('Likes', upvoteSchema);
