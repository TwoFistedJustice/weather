**INTRODUCTION**

This is a small command line weather applet running on Node.js. It fetches the current
weather for the location you give it. You can enter a street address, a city, or a 
postal code. It will tell you the current temperature, the apparent temperature, 
the expected high temperature, the expected high UV Index, and what time to expect
those highs to occur. It will also give you the current air quality for the location,
based on US EPA guidelines.

It was built for the purpose of learning Node.js. In real life you would probably be
better served by just downloading a proper weather app for your phone. But if you really
want to use it, I can't stop you, though I make no claims or warranties as the quality 
of the forecast or advice.

**Dependencies:**

* Node
* Yargs
* Lodash
* Axios

**API Keys:**  
You will need
* Air Visual API key (air quality)
* DarkSky API key. (weather)
* MapQuest API key. (geo location)
  
Store them it in a file called "config.js" in
a folder (also) called config, two directory levels back from
where you keep the app.

Or if you are only going to run the app on your local machine
you can just change the value of the variables `darkSkyKey`, `mapQuestKey`,
 and `airVisualKey` to the string value of the respective keys.

**INSTALLING THE APP**  
Extract the zip file to a location of your choice. Open the location in terminal.
Install the dependencies using `npm install`. 

**USING THE APP**

Begin all commands with `node app.js`.

All commands are entered on ONE LINE.

Anything described here in `[square brackets] `should be enclosed in "double quotes".

**WEATHER**

To get current weather type `-a [address or postal code]` (for where you want to get weather)

**SAVE A LOCATION**

You must fetch weather on same command line.
To save a location for quicker access later (easier to type, skips the geo location server request)
type  
 `-a [address or postal code to get weather] --name [the nickname you want to use] save`


**LIST ALL SAVED LOCATIONS**

To get a list of currently saved locations type `list`  
It displays them sorted by the nickname you gave them.

**DELETE A SAVED LOCATION**
Requires `--name` switch
Type `--name [the nickname you want to delete] delete`

**GET WEATHER FOR A SAVED LOCATION**
type `-g [word you used as the nickname. Use double quotes around nickname in Windows]`

**SET A DEFAULT LOCATION**

Note: you must save a location _before_ setting it as your default.
Requires the `--name` switch.
Type `--name [the nickname of the location] home`
Whatever you set to home, gets fetched when you pass no paramaters.


**SUMMARY OF INTERFACE**

Commands you begin with a hypen `-`
* `-a` : gets weather for a given address or postal code. 
Note: different countries may use the same postal code.  

Example: `node app.js -a 60176` 
fetches weather for Schiller Park, Chicaogo USA

When typing a postal code with no spaces you may omit quotation marks.

When typing anything that has spaces you must use quotation marks.  

Example: `node app.js -a ""870 Valencia St, San Francisco, CA 94110"`  
Fetches the weather for Borderlands Cafe in San Francisco. 
Note: it does not get the weather INSIDE the cafe. The weather
inside the cafe is just WEIRD. 


* `-g` : gets weather for a saved location

Example: You prevsiously saved your home address with the nickname "home". Note,
the command is also called "home". So you would type `node app.js -g home`.
If you had a location nicknamed "bff" you would type `node app.js -g bff`.


Let's say you wanted to save the location of your favorite cafe. You would type
`node app.js -a "1110 Garden St, San Luis Obispo, CA 93401" --name linnaeas save`



In general you follow the above pattern for every command in the app.
`-a` or `-g` followed by an address or postal code. The only exception is the `list` command
which can be used without any other parameters.



