const md5 = require('md5');
const JWT = require('jsonwebtoken');
const isValid = require('./validation');
const Admin = require('./models');

const SECRET_TOKEN = process.env.SHA1;

const login = (req, res) => {
	if (isValid(req, res)) {
		const admin = new Admin();
		admin.email = req.body.email;
		admin.password = req.body.password;
		
		Admin.find(
			{},
			(err, results) => {
				if(err) res.status(500).send({message: err.message});
				if(results && results.length > 0) {
					const registeredAdmin = results.find(
						a => (a.password === md5(admin.password)) && a.email === admin.email
					);
					if(registeredAdmin) {
						const token = JWT.sign(
							{ _id: registeredAdmin._id, email: registeredAdmin.email }, SECRET_TOKEN
						);
						res.status(200).send({ _id: registeredAdmin._id, email: registeredAdmin.email, token });
						return;
					}
				}
				res.status(403).send({message: 'Invalid Credentials'});
			}
		);
	}
};

module.exports = {
	login,
};
