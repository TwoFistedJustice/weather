**Dependencies you need to install:**

Use whatever the latest version is. Nothing in here is so complex that it will break with a new release.
* Node
* Yargs
* Lodash
* Axios

**API Keys:**  
You will need
* MapQuest API key.
* DarkSky API key.
  
You will need to store them it in a file called "config.js" in
a folder (also) called config, two directory levels back from
where you keep the app.

Or if you are only going to run the app on your local machine
you can just change the value of the variables "darkSkyKey"
and "mapQuestKey" to the string value of the respective keys.


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


**DELETE A SAVED LOCATION**
Requires `--name` switch
Type `--name [the nickname you want to delete] delete`

**GET WEATHER FOR A SAVED LOCATION**
type `-g [word you used as the nickname. Use double quotes around nickname in Windows]`

**SET A DEFAULT LOCATION**

Note: you must save a location _before_ setting it as your default.
Requires the `--name` switch.
Type `--name [the nickname of the location] home`
Set a default location. Whatever you set to home, gets fetched when you pass
no paramaters.


**SUMMARY**

Commands you begin with `-`
* `-a` : gets weather for a given address or postal code. 
Note: different countries may use the same postal code.  
Example: `node app.js -a 60176` 
fetches weather for Schiller Park, Chicaogo USA
When using a postal code you may omit quotation marks.

When using an address you must use quotation marks.
Example: `node app.js -a ""870 Valencia St, San Francisco, CA 94110"`  
Fetches the weather for Borderlands Cafe in San Francisco. 
Note: it does not get the weather INSIDE the cafe. The weather
inside the cafe is just WEIRD. 


* `-g` : gets weahter for a saved location



