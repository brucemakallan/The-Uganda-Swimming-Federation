const express = require('express');
const cors = require('cors');
const jwtMiddleware = require('express-jwt');
const article = require('./Article/controllers');
const admin = require('./Admin/controllers');

const app = express();
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(express.json());

// Secure "protected" endpoints with JWT middleware
var SECRET_TOKEN = process.env.SHA1;
app.use('/api/protected', jwtMiddleware({
  secret: SECRET_TOKEN,
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Bearer token in the header
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) { // As URI param
      return req.query.token;
    } else if (req.cookies && req.cookies.token) { // As a cookie parameter
      return req.cookies.token;
    }
    return null; // this will return a 401 (unauthorized)
  }
}));

// welcome
const WELCOME_MESSAGE = 'Welcome to The Uganda Swimming Federation API';
const welcome = (req, res) => res.send({message: WELCOME_MESSAGE});
app.get('/', welcome);
app.get('/api', welcome);

// Articles
app.get('/api/articles', article.getAllArticles);
app.get('/api/articles/:id', article.getSpecificArticle);
app.post('/api/protected/articles', article.postArticle);
app.put('/api/protected/articles/:id', article.updateArticle);
app.delete('/api/protected/articles/:id', article.deleteArticle);

// Admin Login
app.post('/api/admin', admin.login);

module.exports = app;
