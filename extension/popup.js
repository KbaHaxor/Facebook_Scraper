function sendMessageToActiveTab(message) {
	chrome.tabs.query({active:true},function(tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, message);
	});
}

function getProfileUrls() {
	// communication between the popup and content script wouldn't work, despite much googling
	sendMessageToActiveTab({'message': 'get_profile_urls'});
}

function scrapeAllProfiles() {
	chrome.runtime.sendMessage({'message': 'initiate_profile_scrape'})
}

window.onload = function () {
	// chrome extensions don't like in-line funciton calls, so putting onclick="foo()" in the html caused problems
	document.getElementById('get-profile-urls-button').addEventListener('click', getProfileUrls);
	document.getElementById('scrape-all-profiles-button').addEventListener('click', scrapeAllProfiles);
}