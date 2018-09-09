const gooleGeoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=91740`

const yargs = require('yargs');
const axios = require('axios');
const config = require('../../config/config');

const geo = require('./geo');
const interpret = require('./interpretWeather');
const places = require('./saveLocations');

const darkSkyKey = config.darkSkyKey;
// const mapQuestKey = config.mapQuestNodeWeatherKey;
// const mapquestGeoURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}`;

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
  })
  .command('save', 'Save a place name on your local machine.', {name: nameOptions})
  .command('list', 'Display all saved places and their coordinates')
  .command('weather', 'Display the weather for the location you enter.')
  .help()
  .alias('help', 'h')
  .argv;

var command =argv._[0];
console.log('************************\n', JSON.stringify(argv, undefined, 2));


if (command === 'name') {
  console.log('--------------------> sucess with basic setup!')
} else if (command === 'list') {
  console.log(places.fetchLocation());
}

const encodedAddress = encodeURIComponent(argv.address);
// const geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
const geoCodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${encodedAddress}`;


if ( argv.a !== undefined) {
  // call the server and get weather
  // move the fn to another file
  // can I move fetchedData and fns over?
  geo.fetchGeoData();
  
}



  if (command === 'save') {
    console.log('YIPPEE')
    
    places.addPlace(locationData);
  }
  




var displayWeatherReport = () => {
  let uvHighTime = convertUnixtime(fetchedData.time.uvIndexTime);
  let hottestTime = convertUnixtime(fetchedData.time.temperatureHighTime);
  let hottestApparentTime = convertUnixtime(fetchedData.time.apparentTemperatureHighTime);
  let uvRating = interpret.uvIndexLevel(fetchedData.daily.uvIndex);
  let aqi = interpret.ozoneLevel(fetchedData.daily.ozone);
  
  console.log(`${fetchedData.location.name}:`);
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


//next up:
// https://developer.mapquest.com/documentation/geocoding-api/

/*
 XXX 1. write time conversion fn
 XXX 2. write ozone intpreting fn
 XXX 3. write UVI interpreting fn
 4+. Implement write file functionality
* */

//making a change to screen shot commit diaglogue