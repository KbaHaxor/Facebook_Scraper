function captureProfileUrls() {
	//not fully functional, only scraps first page.
	//Fully view group members
	while (document.getElementsByClassName('pam uiBoxLightblue uiMorePagerPrimary')[0].hasAttribute('href')) {
		var seeMore = document.getElementsByClassName('pam uiBoxLightblue uiMorePagerPrimary')[0];
		seeMore.click();
	};

	var profileImageLinksToProfiles = document.querySelectorAll('a._8o._8r.lfloat._ohe:not(.fbxWelcomeBoxSmallLeft)');
	var profileUrls = [];
	for (var i = 0; i < profileImageLinksToProfiles.length; i++) {
		var aUrl = profileImageLinksToProfiles[i].href;
		profileUrls.push(aUrl);
	}
	// send profile urls back to background for storing
	chrome.runtime.sendMessage({
		'message': 'store_profile_urls',
		'profileUrls': profileUrls
	});
}

function scrape(parent, child) {
	if (document.getElementsByClassName(parent)[0]) {
		var parent_Element = document.getElementsByClassName(parent)[0];
		var ans = parent_Element.getElementsByClassName(child)[1].innerText;
	} else {
		var ans = 'Not Provided';
	}
	return ans;
}


function get_Email(front, end) {
	if (document.getElementsByClassName(front)[0]) {

		var front_Email = document.getElementsByClassName(front)[0].innerText;
		var end_Email = document.getElementsByClassName(end)[0].innerText;
		var complete_Email = front_Email.concat(end_Email);
	} else {
		var complete_Email = "Not Provided";
	}
	return complete_Email;
}


function get_hometown(parent) {
	if (document.getElementsByClassName(parent) !== null && document.getElementsByClassName(parent).length > 1) {
		var places_Lived = document.getElementsByClassName(parent);
		var first_place_lived = places_Lived[places_Lived.length - 1];
		var home_Town = first_place_lived.innerText;

	} else if (document.getElementsByClassName(parent).length === 1) {
		var home_Town = document.getElementsByClassName(parent)[0].innerText;

	} else {
		var home_Town = 'Not provided';
	}
	return home_Town;
}

function get_HighSchool(class_name) {
	if (document.getElementsByClassName(class_name)[0]) {
		var schools = document.getElementsByClassName(class_name);
		if (schools.length > 1) {
			var first_School = schools[schools.length - 1].innerText;
		} else {
			var first_School = schools[0].innerText;
		}
	} else {
		var first_School = "Not provided";
	}
	return first_School;
}

function contact_Basic_Info(name, func1, func2, func3) {
	var email = func1();
	var gender = func2();
	var bday = func3();
	var holder = [name, email, gender, bday]
	return holder;
}


chrome.runtime.onMessage.addListener(
	//redirects to next page
	function(request, sender, sendReponse) {
		if (request.message === 'get_profile_urls') {
			captureProfileUrls();
		} else if (request.message === 'profile_urls_stored') {
			alert('Profile URLs stored successfully');
		}
	}
);
window.onload = function() {
	var currentUrl = window.location.href;
	var page_Nav = document.getElementsByClassName('_5pwr');
	var living = new RegExp(/living/g);
	var contact = new RegExp(/contact/g);
	var education = new RegExp(/education/g);
	var about = new RegExp(/about/g);
	var profile_type = new RegExp(/profile.php/g);
	var profile_location = currentUrl.substr(currentUrl.length - 5);

	if (profile_location == '_list') {
		//about nav
		document.getElementsByClassName('_6-6')[1].click();
	} else {
		var profile_Name = document.getElementById('fb-timeline-cover-name').textContent;

		if (contact.test(currentUrl)) {
			//scrape basic info
			var email = get_Email('_50f9 _50f7', 'word_break');
			var gender = scrape('_3pw9 _2pi4 _2ge8 _3ms8', '_50f4')
			var bday = scrape('_3pw9 _2pi4 _2ge8 _4vs2', '_50f4')
			var basic_info = [profile_Name, email, gender, bday]

			chrome.runtime.sendMessage({
				'message': 'basic_info',
				'basic_info': basic_info
			});
			//navigate to work & education
			page_Nav[1].click();

		} else if (education.test(currentUrl)) {
			var edu_info = get_HighSchool('_2lzr _50f5 _50f7');
			chrome.runtime.sendMessage({
				'message': 'edu_info',
				'edu_info': edu_info
			});
			//navigate to places lived
			page_Nav[2].click();
		} else if (living.test(currentUrl)) {
			var home_info = get_hometown('_50f5 _50f7');
			chrome.runtime.sendMessage({
				'message': 'home_info',
				'home_info': home_info
			});
		} else {
			//navigates to about if not already on
			page_Nav[3].click();
		}
	}
}