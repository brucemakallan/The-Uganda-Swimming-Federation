const mongoose = require('../databaseConnection');
const schema = require('./schema');

const Schema = mongoose.Schema;
const fields = new Schema({ ...schema });
const model = mongoose.model('Article', fields);
module.exports = model;
