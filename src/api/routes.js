const express = require('express');
const cors = require('cors');
const jwtMiddleware = require('express-jwt');
const article = require('./Article/controllers');
const admin = require('./Admin/controllers');
const { WELCOME_MESSAGE, PROTECTED_ENDPOINT_PREFIX } = require('./utils');
const { verifyToken, jwtErrorHandler } = require('./jwt');

const app = express();
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(express.json());

// Secure "protected" endpoints with JWT middleware
app.use(PROTECTED_ENDPOINT_PREFIX, jwtMiddleware(verifyToken));
app.use(jwtErrorHandler);

// welcome
const welcome = (req, res) => res.send({message: WELCOME_MESSAGE});
app.get('/', welcome);
app.get('/api', welcome);

// Articles
app.get('/api/articles', article.getAllArticles);
app.get('/api/articles/:id', article.getSpecificArticle);
app.post(`${PROTECTED_ENDPOINT_PREFIX}/articles`, article.postArticle);
app.put(`${PROTECTED_ENDPOINT_PREFIX}/articles/:id`, article.updateArticle);
app.delete(`${PROTECTED_ENDPOINT_PREFIX}/articles/:id`, article.deleteArticle);

// Admin Login
app.post('/api/admin', admin.login);

module.exports = app;
