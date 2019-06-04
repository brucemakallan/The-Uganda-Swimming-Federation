const { UNAUTHORIZED_ERROR_MESSAGE } = require('./utils');

const SECRET_TOKEN = process.env.SHA1;

const verifyToken = {
	secret: SECRET_TOKEN,
	getToken: function (req) {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			return req.headers.authorization.split(' ')[1]; // get token from headers
		} else if (req.query && req.query.token) {
			return req.query.token; // get token from URI param
		} else if (req.cookies && req.cookies.token) {
			return req.cookies.token; // get token from cookie parameter
		} 
		return null; // this will return a 401 (unauthorized)
	}
};

const jwtErrorHandler = (err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send({message: UNAUTHORIZED_ERROR_MESSAGE});
	}
};

module.exports = {
	verifyToken,
	jwtErrorHandler,
};
