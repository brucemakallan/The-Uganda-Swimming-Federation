const express = require('express');
const cors = require('cors');
const article = require('./Article/controllers');

const app = express();
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(express.json());

// welcome
const WELCOME_MESSAGE = 'Welcome to The Uganda Swimming Federation API';
const welcome = (req, res) => res.send({message: WELCOME_MESSAGE});
app.get('/', welcome);
app.get('/api', welcome);

// Articles
app.get('/api/articles', article.getAllArticles);
app.get('/api/articles/:id', article.getSpecificArticle);
app.post('/api/articles', article.postArticle);
app.put('/api/articles/:id', article.updateArticle);
app.delete('/api/articles/:id', article.deleteArticle);

module.exports = app;
