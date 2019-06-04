const requiredString = {
	type: String,
	trim: true,
	required: true,
};

module.exports = {
	email: { ...requiredString },
	password: { ...requiredString },
};
