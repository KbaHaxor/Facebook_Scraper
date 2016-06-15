#Facebook Scraper
###A web scraper for Facebook utilizing Node.js

<br><br>
####Introduction
The purpose of this project is to grab information
concerning name, age, gender, hometown, and highschool
from profile that are members in a facebook group. The information will
be used to crossreference University of Minnesota databases.
As it stands today, **June 15, 2016**,
Facebook_Scraper is functional, but the software liscence for the finished product
was purchased. The client asked me not to upload the finished code on Github.
<br><br>
Facebook_Scraper is implemented through a Node.js
based webserver and a Google Chrome extension. It is built this way
because extracting information from a Facebook web page is trivial,
but outputting the information to a file is not. The file output aspect is
what generated a need for a webserver. In a nutshell, Facebook_Scraper will
fetch the profile URLs from a Facebook group member page, iterate through the collected URLs, and post them to
a local webserver. The webserver then writes the profile information to a file in XML format.
<br><br>
####Installation
<ol>
	<li>You'll need to be running linux with both npm and nodejs
	installed. Both are available using <code>apt-get</code>.
	You will also need Google Chrome.</li>
	<li>Clone this repo to wherever. That path will be referred to as
	"scraper_path" in the following steps.</li>
	<li>In Chrome load the unpacked extension located in
	scraper_path/extension.</li>
	<li>In the scraper_path directory, run the command
	<code>npm install</code>. This will install the express and
	body-parser node modules</li>
	<li>Next, run <code>nodejs server.js</code><br>You should see a
	message indicating the server is listening on localhost:8080. You
	may change the listening port as needed.</li>
	<li>Navigate to a Facebook group page and click the
	facebook_Scraper extension button. In the drop down menu click "Get Profile Urls".
	Once the Urls have been collected click the extension again and click "Scrape all Profiles".
	In scraper_path, there will be a new
	file called <code>face_Book_Profiles.xml</code> that will hold  from
	that page. You may do this on as many pages as needed, and all
	profile information will be appended to <code>face_Book_Profiles.xml</code>.</li>
</ol>
