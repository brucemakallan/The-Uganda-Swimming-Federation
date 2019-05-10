const mongoose = require('mongoose');

const configEnvironment = require(`../../config/${process.env.NODE_ENV}`);

const connectionUrl = configEnvironment.db;
mongoose.connect(connectionUrl, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true); // permit the use of "unique" in schemas
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to Database!'));
module.exports = mongoose;
