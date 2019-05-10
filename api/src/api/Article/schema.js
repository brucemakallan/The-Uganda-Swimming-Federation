const trimmedString = {
	type: String,
	trim: true,
};
const requiredString = {
	type: String,
	trim: true,
	required: true,
}

// headings 1-6, body, images, dates 1-2, parent, category, files
module.exports = {
	heading1: { ...trimmedString },
	heading2: { ...trimmedString },
	heading3: { ...trimmedString },
	heading4: { ...trimmedString },
	heading5: { ...trimmedString },
	heading6: { ...trimmedString },
	body: { ...requiredString },
	dateIn: { ...trimmedString },
	dateOut: { ...trimmedString },
	images: { type: [String] },
	files: { type: [Object] },
	parent: { ...trimmedString },
	category: { ...trimmedString },
	dateCreated: {type: String, default: Date.now},
};
