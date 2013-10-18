
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/search', function (req, res){
	fs.readFile(__dirname + '/public/javascripts/search-data.js', function (err, data){
		if(err){console.log(err);}
		var d = JSON.parse(data);
		var searchTerm = req.query.key;
		var reg = new RegExp(searchTerm, 'gi');
		
		for(var x in d){
			for(var y in d[x]){
				if(d[x][y]['desc'].match(reg)){
					res.send(d[x][y]);
				}
			}
		}
	});
	
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
