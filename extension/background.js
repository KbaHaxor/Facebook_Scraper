var profileUrlCollection = [];
var profileInfoCollection = []; // an array of profile objects holding profile information
var incomplete_Profile = [];

function Profile(fullName, email, gender, birthDay, homeTown, highSchool) {
	this.fullName = fullName;
	this.email = email;
	this.gender = gender;
	this.birthDay = birthDay;
	this.homeTown = homeTown;
	this.highSchool = highSchool;
}

function sendMessageToActiveTab(message) {
	chrome.tabs.query({
		active: true
	}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, message);
	});
}

function start_Next_Scrape() {
	if (profileUrlCollection.length !== 0) {
		var profileUrl = profileUrlCollection.pop();
		chrome.tabs.query({
			active: true
		}, function(tabs) {
			var activeTab = tabs[0];
			chrome.tabs.update(activeTab.id, {
				url: profileUrl
			}, function(tab) {
				// response sent after redirect - means we can safely scrape
				sendMessageToActiveTab({
					'message': 'scrape_profile_info'
				});
			});
		});
	}

}

function write_Profile(profile) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(profile),
		contentType: "application/json",
		dataType: 'json',
		url: 'http://localhost:8080/write-profiles'

	});
}
chrome.runtime.onMessage.addListener(
	//write info 
	function(request, sender, sendResponse) {
		if (request.message === 'store_profile_urls') {
			request.profileUrls.forEach(function(element) {
				profileUrlCollection.push(element); // push all urls to the url collection
			});
			sendMessageToActiveTab({
				'message': 'profile_urls_stored'
			});
		} else if (request.message === 'initiate_profile_scrape') {

			window.setTimeout('start_Next_Scrape()', 10000);

		} else if (request.message === 'page_load') {
			sendMessageToActiveTab({
				'message': 'gopher_it'
			});
		} else if (request.message === 'basic_info') {
			var singleProfile = new Profile(request.basic_info[0], request.basic_info[1], request.basic_info[2], request.basic_info[3], 'Not Available', 'Not Available');
			incomplete_Profile.push(singleProfile);

		} else if (request.message === 'edu_info') {
			incomplete_Profile[0].highSchool = request.edu_info;


		} else if (request.message === 'home_info') {
			if (profileUrlCollection.length !== 0) {
				if (request.home_info === "undefined") {
					incomplete_Profile[0].homeTown = "Not Provided";
					var singleProfile = incomplete_Profile.pop();
					write_Profile(singleProfile);
					profileInfoCollection.push(singleProfile);
					window.setTimeout('start_Next_Scrape()', 10000);
				} else {
					incomplete_Profile[0].homeTown = request.home_info;
					var singleProfile = incomplete_Profile.pop();
					write_Profile(singleProfile);
					profileInfoCollection.push(singleProfile);
					window.setTimeout('start_Next_Scrape()', 10000);
				}

			} else {
				if (incomplete_Profile.length !== 0) {
					incomplete_Profile[0].homeTown = request.home_info;
					var last_profile = incomplete_Profile[0];
					write_Profile(last_profile);
				}
				window.setTimeout('start_Next_Scrape()', 10000);

			}

		}
	});