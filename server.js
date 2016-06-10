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
	var profile = request.body;
	try {

		
			 
			var xml = '<profile><fullName>' + profile.fullName + '</fullName><email>' + profile.email + '</email><gender>' +
				profile.gender + '</gender><birthDay>' + profile.birthDay + '</birthDay><homeTown>' + profile.homeTown +
				'</homeTown><highSchool>' + profile.highSchool + '</highSchool></profile>';
			console.log(xml);
			fs.appendFile('face_Book_Profiles.xml', xml, function(e) {
				if (e !== null) {
					console.log(e);
				}
			});
		


		response.status(200).send('profiles written successfully');
	} catch (e) {
		console.log(e);
		response.status(500).send('profiles not written');
	}

});

app.listen(PORT, function() {
	console.log('Listening on localhost:%s', PORT);});
