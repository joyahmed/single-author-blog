const path = require('path');

module.exports = {
	reactStrictMode: true,
	webpack: config => {
		config.resolve.alias['@'] = path.resolve(__dirname);
		return config;
	},
	images: {
		domains: ['lh3.googleusercontent.com', 'res.cloudinary.com']
	},
	env: {
		AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
		CLOUDINARY_NAME: process.env.CLOUDINARY_NAME
	},
};

