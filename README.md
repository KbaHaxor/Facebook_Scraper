#Facebook Scraper
###A web scraper for Facebook utilizing Node.js

<br><br>
####Introduction
The purpose of this project is to grab information
concerning name, age, gender, hometown, and college
major from group members in a facebook group. The information will
be used to crossreference University of Minnesota databases.
As it stands today, **June 3, 2016**,
Facebook_Scraper isn't functional. We are adapting a previous project
GSScrapNode https://github.com/rdhite/GSScrapeNode
to complete the task.
<br><br>
GSScrapeNode is a version of GSScrape implemented through a Node.js
based webserver and a Google Chrome extension. It is built this way
because extracting titles from a Google Scholar web page is trivial,
but outputting the titles to a file is not. The file output aspect is
what generated a need for a webserver. In a nutshell, GSScrapeNode will
fetch the titles from a Google Scholar results page and post them to
a local webserver. The webserver will then write the titles to a file.
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
	<li>Navigate to a Google Scholar page with results and click the
	GSScrapeNode extension button. In scraper_path, there will be a new
	file called <code>titles.txt</code> that will hold the titles from
	that page. You may do this on as many pages as needed, and all
	titles will be appended to <code>titles.txt</code>, one title per
	line.</li>
</ol>
