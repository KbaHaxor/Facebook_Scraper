var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

const PORT = 8080;

app.post('/write-profiles', function(request, response) {
	// This is going to get a post of an array of profile objects
	// we need to write those out.
	var profiles = request.body;
	try {
		for(var index in profiles){
			console.log('Writing profile ' + index);
			fs.appendFile('profiles.txt', JSON.stringify(profileUrl[index]) + '\n', // this will write the Profile object as a single JSON line, which is not quite what we want.
			function(e) {
				if(e !== null) { console.log(e); }
			});
		}
		response.status(200).send('profiles written successfully');
	} catch(e) {
		console.log(e);
		response.status(500).send('profiles not written');
	};
});

app.listen(PORT, function() {
	console.log('Listening on localhost:%s', PORT);
});
