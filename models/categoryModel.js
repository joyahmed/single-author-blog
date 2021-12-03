const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		}
	},
	{ timestamps: true }
);

let Dataset =
	mongoose.category || mongoose.model('category', categorySchema);

export default Dataset;
