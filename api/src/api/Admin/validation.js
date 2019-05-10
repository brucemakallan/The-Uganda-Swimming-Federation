const Joi = require('joi');

const requiredJoiString = () => Joi.string().min(6).required();

const joiSchema = Joi.object().keys({
	email: requiredJoiString(),
	password: requiredJoiString(),
});

const isValid = (req, res) => {
	const { error } = Joi.validate(req.body, joiSchema);
	if(error) {
		error.details[0] && error.details[0].message && res.status(400).send({message: error.details[0].message});
		return false;
	}
	return true;
};

module.exports = isValid;
