const trimmedString = {
	type: String,
	trim: true,
};
const requiredString = {
	type: String,
	trim: true,
	required: true,
};

// headings 1-6, body, images, dates 1-2, parent, category, files, videos, tags
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
	videos: { type: [Object] },
	tags: { type: [Object] },
	parent: { ...trimmedString },
	category: { ...requiredString },
	dateCreated: {type: String, default: Date.now},
};
