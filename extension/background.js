var profileUrlCollection = []; // an array of profile urls
var profileInfoCollection = []; // an array of profile objects holding profile information

chrome.runtime.onMessage.addListener(
	//write info 
	function(request, sender, sendResponse) {
		if (request.message === "store_profile_urls") {
			chrome.tabs.query({active:true},function(tabs){
				var activeTab = tabs[0];
				profileUrlCollection = request.profileUrls;
				chrome.runtime.sendMessage({'message': 'profile_urls_stored'});
			});
			return true;
		}
		else if (request.message === 'initiate_profile_scrape') {
			if (profileUrlCollection !== []) {
				var profileUrl = profileUrlCollection.pop();
				chrome.runtime.sendMessage({'message': 'scrape_profile_info', 'profileUrl': profileUrl});
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
				data: JSON.stringify(profileInfoCollection),
				contentType: "application/json",
				dataType:'json',
				url: 'http://localhost:8080/write-profiles'
			});
		}
	}
);
