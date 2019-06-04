const mongoose = require('../databaseConnection');
const schema = require('./schema');

const Schema = mongoose.Schema;
const fields = new Schema({ ...schema });
const model = mongoose.model('Admin', fields);
module.exports = model;
