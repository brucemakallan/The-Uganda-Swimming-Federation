const Joi = require('joi');

const requiredJoiString = () => Joi.string().min(1).required();
const basicString = () => Joi.string().allow('');

const joiSchema = Joi.object().keys({
	heading1: basicString(),
	heading2: basicString(),
	heading3: basicString(),
	heading4: basicString(),
	heading5: basicString(),
	heading6: basicString(),
	body: requiredJoiString(),
	dateIn: basicString(),
	dateOut: basicString(),
	images: Joi.array().items(basicString()),
	tags: Joi.array().items(Joi.object()),
	files: Joi.array().items(Joi.object()),
	videos: Joi.array().items(Joi.object()),
	parent: basicString(),
	category: requiredJoiString(),
	dateCreated: basicString(),
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
