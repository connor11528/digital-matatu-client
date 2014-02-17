var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.configure(function(){
	// Serve up content from public directory
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
	app.use(express.bodyParser());
	app.use(express.logger('dev')); 
	app.use(express.favicon());
});

app.listen(port, function(){
	console.log('Express server listening on port ' + port);
});
