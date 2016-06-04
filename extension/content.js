function Profile (fullName, email, gender, homeTown, highSchool, birthDay) {
		this.fullName = fullName;
		this.email = email;
		this.gender = gender;
		this.homeTown = homeTown;
		this.highSchool = highSchool;
		this.birthDay = birthDay;

	}

function captureUrls(){
	// get Urls from page

	//Fully view group members
	while(document.getElementsByClassName('pam uiBoxLightblue uiMorePagerPrimary')[0].hasAttribute('href')){
		var seeMore = document.getElementsByClassName('pam uiBoxLightblue uiMorePagerPrimary')[0];
		seeMore.click();
		};

	var profileImageLinksToProfiles = document.querySelectorAll('a._8o._8r.lfloat._ohe:not(.fbxWelcomeBoxSmallLeft)');
	var  profileUrls= [];
	for (var i = 0; i < tempProfileUrls.length; i++) {
		var aUrl = tempProfileUrls[i].href;
		profileUrls.push(aUrl);
	}
	// send titles back to background for posting
	chrome.runtime.sendMessage({'message': 'store_profile_urls', 'profileUrls': profileUrls});
}

function scrape (parent, child){
	if (document.getElementsByClassName(parent)[0]){
		var parent_Element = document.getElementsByClassName(parent)[0];
		var ans = parent_Element.getElementsByClassName(child)[0].innerText;

		}
	else {
			var ans = 'Not Provided';
			}
		return ans;
		}

function get_Email (front, end) {
	if !(document.getElementsByClassName(front)[0]) {
			var complete_Email = "Not Provided";

			}
	else{
				var front_Email = document.getElementsByClassName(front)[0].innerText;
        		var end_Email = document.getElementsByClassName(end)[0].innerText;
        		var complete_Email = front_Email.concat(end_Email);
        		return complete_Email;
		}
		return complete_Email;
	}


function get_hometown (parent, child){
	if (document.getElementById(parent)[0]) {
        	var parent_Element_Home_Town = document.getElementById(parent)[0];
        	var home_Town = parent_Element_Home_Town.getElementsByClassName(child)[0].innerText;
        		}
    else {
        	var home_Town = 'Not provided';
        			}
        return home_Town;
        }

function get_HighSchool (class_name) {
			if (document.getElementsByClassName(class_name)[0]) {
                var schools = document.getElementsByClassName(class_name);
                var first_School = schools.slice(-1).pop().innerText;
                }
            else {
                var first_School = "Not provided";
                }
                return first_School;
                }

function page_scrape (){
	// directs scrpit to about page
	var aboutNav = document.getElementsByClassName('_6-6')[1];
    aboutNav.click();
    var profile_Name = document.getElementById('fb-timeline-cover-name').textContent;
    //0 = Overview
    //1 = Work and Education
    //2 = Places lived
    //3 = Contact & basic Info
    //4 = Family & Relationships
    //5 = Details About User
    //6 = Life Events
    var page_Nav = document.getElementsByClassName('_5pwr');
    //Navigate to basic info and scrape
    page_Nav[3].click();
	var complete_Email = get_Email('_50f9 _50f7', 'word_break');
    var gender = scrape('_3pw9 _2pi4 _2ge8 _3ms8','_50f4' );
	var bday = scrape ('_3pw9 _2pi4 _2ge8 _4vs2', '_50f8 _50f4 _5kx5');
	//get hometown
    page_Nav[2].click();
    var home_Town = get_hometown('hometown','_50f5 _50f7');
    //get highschool
    page_Nav[1].click();
    var highSchool = get_HighSchool('_2lzr _50f5 _50f7');
    var singleProfile = new Profile(profile_Name,complete_Email,gender, home_Town, highSchool, bday);
	return singleProfile;




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
			var singleProfile = page_scrape();
			chrome.runtime.sendMessage({'message': 'store_single_profile_info', 'singleProfile': singleProfile});
		}
	}
);


