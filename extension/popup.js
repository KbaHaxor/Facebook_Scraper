function sendMessageToTab(message) {
	chrome.tabs.query({active:true},function(tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, message);
	});
}

function getProfileUrls() {
	// communication between the popup and content script wouldn't work, despite much googling
	sendMessageToTab({'message': 'get_profile_urls'});
}

function scrapeAllProfiles() {
	chrome.runtime.sendMessage({'message': 'initiate_profile_scrape'})
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.message === 'profile_urls_stored') {
			document.getElementById('scrape-all-profiles-button').disabled = false;
		}
	});

window.onload = function () {
	// chrome extensions don't like in-line funciton calls, so putting onclick="foo()" in the html caused problems
	document.getElementById('get-profile-urls-button').addEventListener('click', getProfileUrls);
	document.getElementById('scrape-all-profiles-button').addEventListener('click', scrapeAllProfiles);
}