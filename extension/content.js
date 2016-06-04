class Profile {
	constructor() {
		this.FirstName = '',
		this.LastName = '' // Maybe we just want to keep the whole name one variable
		// whatever other things we will need
	}
};

function captureUrls(){
	// get Urls from page
	var profileImageLinksToProfiles = document.querySelectorAll('a._8o._8r.lfloat._ohe:not(.fbxWelcomeBoxSmallLeft)');
	var  profileUrls= [];
	for (var i = 0; i < tempProfileUrls.length; i++) {
		var aUrl = tempProfileUrls[i].href;
		profileUrls.push(aUrl);
	}
	// send titles back to background for posting
	chrome.runtime.sendMessage({'message': 'store_profile_urls', 'profileUrls': profileUrls});
}

chrome.runtime.onMessage.addListener(
	//redirects to next page
	function(request , sender, sendReponse) {
		if ( request.message === 'get_profile_urls') {
			captureUrls();
		}
		else if (request.message === 'scrape_profile_info') {
			var profileUrl = request.profileUrl;
			window.assign(profileUrl);
			// scrape page for the needed info
			// put it into a profile object
			var singleProfile = new Profile();
			// singleProfile.FirstName = the first name grabbed from the page
			// put rest of profile info put into singleProfile
			chrome.runtime.sendMessage({'message': 'store_single_profile_info', 'singleProfile': singleProfile});
		}
	}
);