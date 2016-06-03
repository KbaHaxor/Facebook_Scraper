//make event listener to begin on button click


function url_Capture(){
        
            // get Urls from page
            var tempProfileUrls = document.getElementsByClassName('_8o_8r lfloat_ohe');
            var  profileUrls= [];
            for (var i = 0; i < tempProfileUrls.length; i++) {
                var aUrl = tempProfileUrls[i].href;
                profileUrls.push(aUrl);
            }
            // send titles back to background for posting
            chrome.runtime.sendMessage({'message': 'urlList', 'profileUrls': profileUrls});
 

        }
    }


   
   window.onload = ();

   chrome.runtime.onMessage.addListener(
   	//redirects to next page
   		function(request , sender, sendReponse) {
   			if ( request.message === 'go_for_redirect') {
   				window.location.assign(request.next_url);
   				var about_Nav = document.getElementsByClassName('_6-6')[0].href
   				//implement name scrap
   				// birthday
   				//navigate to basic info
   				//scrap Gender
   				//Navigate to Work and Education
   				//Scrap highschool and college
   				// navigate to places lived scrap hometown.
   				//send map of scrapped info to background and list of Urls

   			}
   		} 
   		);

