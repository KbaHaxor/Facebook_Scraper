chrome.runtime.onMessage.addListener(
	//write info 
	function(request, sender, sendResponse) {
		if (request.message === "post_titles") {
			// post request.titles to localhost
			$.ajax({
				type: 'POST',
				data: JSON.stringify(request.titles),
				contentType: "application/json",
				dataType:'json',
				url: 'http://localhost:8080/write-titles'
			});
		}
	}
);
	
			
chrome.runtime.onMessage.addListener(
	//returns next URL for page redirect
	function(request, sender , sendResponse) {
		if (request.message === "urlList") {
			chrome.tabs.getSelected(null, function(tab) {
				var activeTab = tab.id;
				var profileUrls = request.profileUrls;
				var next_url = request.profileUrls.pop();
				 chrome.tabs.sendMessage(activeTab, {'message': 'go_for_redirect', 
				 									'next_url': next_url,
				 									'profileUrls' : profileUrls });
			});
		return true;	
	}
	return true;
			
			}
		
	
	
);



