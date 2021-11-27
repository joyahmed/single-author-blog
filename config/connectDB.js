import mongoose from 'mongoose';

/* const MONGODB_URI = process.env.MONGODB_URI; */

/* if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	);
} */

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
/* let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
	if (cached.conn) {
		console.log('Db connected!');
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false
		};

		cached.promise = mongoose
			.connect(MONGODB_URI, opts)
			.then(mongoose => {
				return mongoose;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
} */

const connectDB = () => {
	if (mongoose.connections[0].readyState) {
		console.log('Already connected.');
		return;
	}

	mongoose.connect(
		process.env.MONGODB_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
		err => {
			if (err) throw err;
			console.log('Connected to mongodb.');
		}
	);
};

export default connectDB;
