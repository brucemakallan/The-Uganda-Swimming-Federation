const isValid = require('./validation');
const Article = require('./models');

const NOT_FOUND_MESSAGE = 'Not Found';

const getAllArticles = (req, res) =>
	Article.find(
		{},
		(err, results) => err
			? res.status(500).send({message: err.message})
			: res.status(200).send(results)
	);

const getSpecificArticle = (req, res) =>
	Article.findById(
		req.params.id,
		(err, results) => {
			if(err) res.status(500).send({message: err.message});
			else {
				results
					? res.status(200).send(results)
					: res.status(404).send({message: NOT_FOUND_MESSAGE});
			}
		}
	);

const postArticle = (req, res) => {
	if (isValid(req, res)) {
		const article = new Article();
		article.heading1 = req.body.heading1;
		article.heading2 = req.body.heading2;
		article.heading3 = req.body.heading3;
		article.heading4 = req.body.heading4;
		article.heading5 = req.body.heading5;
		article.heading6 = req.body.heading6;
		article.body = req.body.body;
		article.dateIn = req.body.dateIn;
		article.dateOut = req.body.dateOut;
		article.images = req.body.images;
		article.tags = req.body.tags;
		article.parent = req.body.parent;
		article.category = req.body.category;
		article.files = req.body.files;
		article.videos = req.body.videos;
		article.save((err) => err
			? res.status(500).send({message: err.message})
			: res.status(201).send(article));
	}
};

const updateArticle = (req, res) => {
	if (isValid(req, res)) {
		Article.findOneAndUpdate(
			{_id: req.params.id},
			req.body,
			{new: true},
			(err, results) => {
				if(err) res.status(500).send({message: err.message});
				else {
					results
						? res.status(200).send(results)
						: res.status(404).send({message: NOT_FOUND_MESSAGE});
				}
			}
		);
	}
};

const deleteArticle = (req, res) =>
	Article.findByIdAndDelete(
		req.params.id,
		(err, results) => {
			if(err) res.status(500).send({message: err.message});
			else {
				results
					? res.status(200).send(results)
					: res.status(404).send({message: NOT_FOUND_MESSAGE});
			}
		}
	);

module.exports = {
	getAllArticles,
	getSpecificArticle,
	postArticle,
	updateArticle,
	deleteArticle
};
