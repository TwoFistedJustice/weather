// const gooleGeoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=91740`
const yargs = require('yargs');
// const axios = require('axios');
// const config = require('../../config/config');
const geo = require('./geo');
const weather = require('./weather');
const interpret = require('./interpretWeather');
const places = require('./saveLocations');

const nameOptions = {
  describe: 'Save a nickname for the place you want to save for quick access. Ideally it should be easy to remember and type.',
  demand: true,
  alias: 's'
};

const argv = yargs
  .options({
    a: {
      describe: 'Get weather for a given location. Use double quotes in Windows.',
      demand: false,
      alias: 'address',
      string: true
    },
    g: {
      describe: 'Get the weather for a saved location. Use double quotes in Windows.',
      demand: false,
      alias: 'get',
      string: true
    },
  })
  .command('save', 'Save a place name on your local machine.', {name: nameOptions})
  .command('list', 'Display all saved places and their coordinates')
  .command('delete', 'Enter a nickname to delete a saved location')
  .command('home', 'Set a /"home/" location. Enter no parameters to get weather for home location')
  .help()
  .alias('help', 'h')
  .argv;

var command =argv._[0];
console.log('line 34', argv)

  if (command === 'list') {
  console.log('app.js 38',places.fetchLocations());
} else if (command === 'delete') {
    places.deleteLocation(argv.name)
  } else if (command === 'home') {
    places.setDefaultLocation(argv.name);
  }

if (argv.a !== undefined) {
  
  geo.fetchGeoData(argv.address)
    .then((response)=>{
      if (command === 'save') {
        places.addPlace(response, argv.name);
      }
      
      return weather.fetchWeather(response);
    }).then((weatherData) => {
     displayWeatherReport(weatherData);
  })
    .catch((err)=>{
      if(err.code === 'ENOTFOUND') {
        console.log("Unable to connect to MapQuest server.");
      } else {
        console.log(err.message);
      }
    });
} else if (argv.g !== undefined) {
  let geoData = places.fetchOneLocation(argv.get);
  
  weather.fetchWeather(geoData)
    .then((weatherData) =>{
      displayWeatherReport(weatherData);
    }).catch((err)=>{
      console.log('saved location error:', err);
  });
} else if (argv.a === undefined && argv.g === undefined && argv._.length === 0) {
  console.log("Fetching default weather for default location");
  console.log('need to implement weather fetch: ', places.getDefaultLocation())
  
}

var displayWeatherReport = ( fetchedData) => {
  let uvHighTime = convertUnixtime(fetchedData.time.uvIndexTime);
  let hottestTime = convertUnixtime(fetchedData.time.temperatureHighTime);
  let hottestApparentTime = convertUnixtime(fetchedData.time.apparentTemperatureHighTime);
  let uvRating = interpret.uvIndexLevel(fetchedData.daily.uvIndex);
  let aqi = interpret.ozoneLevel(fetchedData.daily.ozone);
  
  console.log(`${fetchedData.name}:`);
  console.log(`It is ${fetchedData.current.temperature} degrees, but feels like ${fetchedData.current.apparentTemperature} degrees.`);
  console.log(`It will reach ${fetchedData.daily.temperatureHigh} degrees at ${hottestTime}.`)
  console.log(`It will feel the hottest at ${hottestApparentTime}`);
  console.log(`Maximum UV exposure will be ${uvRating} and will be highest at ${uvHighTime}. `);
  console.log(`The air quality will be ${aqi}.`)
};

/*
I: a number in the form of a unix time stamp
O: a date time string localized
C: none
E: none
What this fn does: It converts unix time to human readable time in the form of hh:mm, omitting seconds.
*/
var convertUnixtime = (unix_timestamp) =>{
 const date = new Date(unix_timestamp * 1000);
 return date.toLocaleTimeString();
};


/* next up:

   * High Priority*
DONE   * add ability to delete a location
DONE * add ability to so fetch weather from saved data, skipping the geo fetch entirely
* add ability to make one location default so if no args passed in, it just gets weather for default

    *Low Priority*
make list print each location on its own line and make it pretty
Refactor so weather.fetchWeather().then calls are not repeated
  -- pull them into a single chained function then call that function.
Make sure saving a location allows duplicate names, but NOT duplicate nicknames

AQI is always Very Unhealthy - see if it's a bug

* */
