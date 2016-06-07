//var profileUrlCollection = urlCollection; // an array of profile urls
var profileInfoCollection = []; // an array of profile objects holding profile information

function sendMessageToActiveTab(message) {
	chrome.tabs.query({active:true},function(tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, message);
	});
}
	


chrome.runtime.onMessage.addListener(
	//write info 
	function(request, sender, sendResponse) {
		if (request.message === 'store_profile_urls') {
			request.profileUrls.forEach(function(element) {
				profileUrlCollection.push(element); // push all urls to the url collection
			});
			sendMessageToActiveTab({'message': 'profile_urls_stored'});
		}
		else if (request.message === 'begin_profile_scrape') {
			var profileUrlCollection = request.urlCollection;
			if (profileUrlCollection !== []) {
				var profileUrl = profileUrlCollection.pop();
				chrome.tabs.query({active:true}, function(tabs) {
					var activeTab = tabs[0];
					chrome.tabs.update(activeTab.id, {url: profileUrl}, function(tab) {
						// response sent after redirect - means we can safely scrape
						sendMessageToActiveTab({'message': 'scrape_profile_info'});
					});
				});
			}
			else {
				chrome.runtime.sendMessage('post_users');
			}
		}
		else if (request.message === 'store_single_profile_info') {
			// store the received profile and send a message to get the next profile
			profileInfoCollection.push(request.singleProfile);
			chrome.runtime.sendMessage({'message': 'initiate_profile_scrape'});
		}
		else if (request.message === 'post_users') {
			// post profileInfoCollection to localhost
			$.ajax({
				type: 'POST',
				data: profileInfoCollection,
				contentType: "application/json",
				dataType:'json',
				url: 'http://localhost:8080/write-profiles'
			});
		}
	}
);
