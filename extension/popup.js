function getProfileUrls() {
	chrome.runtime.sendMessage({'message': 'get_profile_urls'});
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