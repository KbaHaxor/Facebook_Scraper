var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

const PORT = 8080;

app.post('/write-titles', function(request, response) {
	profileUrl = request.body
	try {
		for(var index in profileUrl){
			console.log('Writing profileUrl: ' + profileUrl[index]);
			fs.appendFile('titles.txt', profileUrl[index] + '\n',
			function(e) {
				if(e !== null) { console.log(e); }
			});
		}
	response.status(200).send('profileUrl written successfully');
	} catch(e) {
		console.log(e);
		response.status(500).send('profileUrl not written');
	};

app.listen(PORT, function() {
	console.log('Listening on localhost:%s', PORT);
});
