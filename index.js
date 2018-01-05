const config = require('./config/config.json');
const express = require('express')
const app = express();

const api = require('./routers/api');

// 
app.use('/api', api);
// start server
const server = app.listen(config.server.port, config.server.host, () => {
	console.log(" Echo is Up : http://%s:%s", config.server.host, config.server.port)
});
