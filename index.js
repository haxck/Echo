var config = require('./server/config.json');
var express = require('express')
var app = express();
var server = app.listen(config.server.port, config.server.host, function() {
	console.log(" Echo is Up : http://%s:%s", config.server.host, config.server.port)
});
