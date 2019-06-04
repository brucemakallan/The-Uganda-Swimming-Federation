if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}
const app = require('./api/routes');

const port = process.env.PORT || 8261;
if(!module.parent){
	app.listen(port, () => console.log(`Listening on port ${port} ...`));
}
module.exports = app;
