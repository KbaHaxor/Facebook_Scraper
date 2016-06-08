var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

const PORT = 8080;

app.post('/write-profiles' , function (request, response) {
	// This is going to get a post of an array of profile objects
	// we need to write those out.
	var profiles = request.body;
	try {

		for (var index in profiles) {
			var xml = '<profile><fullName>' + index.fullName + '</fullName><email>' + index.email + '</email><gender>' +
				index.gender + '</gender><birthday>' + index.birthDay + '</birthDay><homeTown>' + index.homeTown +
				'</homeTown><highSchool>' + index.highSchool + '</highSchool></profile>';
			console.log(xml);
			fs.appendFile('face_Book_Profiles.xml', xml, function(e) {
				if (e !== null) {
					console.log(e);
				}
			});
		}


		response.status(200).send('profiles written successfully');
	} catch (e) {
		console.log(e);
		response.status(500).send('profiles not written');
	}

});

app.listen(PORT, function() {
	console.log('Listening on localhost:%s', PORT);});
