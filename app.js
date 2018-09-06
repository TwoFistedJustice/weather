const gooleGeoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=91740`

const yargs = require('yargs');
const axios = require('axios');
const config = require('../../config/config');

const interpret = require('./interpretWeather');
const localFile = require('./defaultLocation');

const darkSkyKey = config.darkSkyKey;
const mapQuestKey = config.mapQuestNodeWeatherKey;
const mapquestGeoURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}`;
const argv = yargs
  .options({
    a: {
      describe: 'Get weather for a given location. Use double quotes in Windows.',
      demand: true,
      alias: 'address',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);
// const geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
const geoCodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${encodedAddress}`;

var fetchedData = {
  location: {
    name: null,
    lat: 34.135653,
    lng: -117.8287845
  },
  current: {
    temperature: null,
    apparentTemperature: null,
    uvIndex: null
  },
  daily: {
    summaryWeekly: null,
    temperatureHigh: null,
    apparentTemperatureHigh:null,
    ozone: null,
    uvIndex: null
  },
  time: {
    timeZone: null,
    apparentTemperatureHighTime:null,
    temperatureHighTime: null,
    uvIndexTime:null
  }};

axios.get(geoCodeURL)
 .then((response) => {
   let errorcode = response.data.info.statuscode;
   if ( errorcode === 400) {
     throw new Error('Input error. You probably typed something wrong. Make sure you are passing a valid URL.');
   } else if (errorcode === 403) {
     throw new Error('Something is wrong with the API key. Make sure it is valid.');
   } else if (errorcode === 500) {
     throw new Error('Make sure you are entering a valid location. Could be a server error. Not really sure.')
   }
   recordLocationData(response.data.results[0].locations[0]);
   
   var weatherData = `https://api.darksky.net/forecast/${darkSkyKey}/${fetchedData.location.lat},${fetchedData.location.lng}`;
   return axios.get(weatherData);
 })
  .then((response)=>{
  
    recordCurrentData(response.data.currently);
    recordDailyData(response.data.daily);
    console.log(fetchedData);
    displayWeatherReport();
  })
  .catch((err)=>{
   if(err.code === 'ENOTFOUND') {
     console.log("Unable to connect to server. Why won't the other computers talk to me???");
   } else {
     console.log(err.message);
   }
});

var recordLocationData = (geoResults) => {
  //geoReults is response.data.results[0]
  fetchedData.location.name = geoResults.adminArea5;
  fetchedData.location.lat = geoResults.latLng.lat;
  fetchedData.location.lng = geoResults.latLng.lng;
};

var recordCurrentData = (currently) => {
  fetchedData.current.temperature = Math.round(currently.temperature);
  fetchedData.current.apparentTemperature = Math.round(currently.apparentTemperature);
  fetchedData.current.uvIndex = Math.round(currently.uvIndex);
  
};

var recordDailyData = (daily) => {
  // console.log(JSON.stringify(daily.data[0], undefined, 2));
  fetchedData.daily.summaryWeekly = daily.summary;
  fetchedData.daily.temperatureHigh = Math.round(daily.data[0].temperatureHigh);
  fetchedData.daily.apparentTemperatureHigh = Math.round(daily.data[0].apparentTemperatureHigh);
  fetchedData.daily.ozone = Math.round(daily.data[0].ozone);
  fetchedData.daily.uvIndex = Math.round(daily.data[0].uvIndex);
  fetchedData.time.apparentTemperatureHighTime = daily.data[0].apparentTemperatureHighTime;
  fetchedData.time.temperatureHighTime = daily.data[0].temperatureHighTime;
  fetchedData.time.uvIndexTime = daily.data[0].uvIndexTime;
};

var interpretUVIndex = () => {};
var interpretOzoneLevel = () => {};


var displayWeatherReport = () => {
  let uvHighTime = convertUnixtime(fetchedData.time.uvIndexTime);
  let hottestTime = convertUnixtime(fetchedData.time.temperatureHighTime);
  let hottestApparentTime = convertUnixtime(fetchedData.time.apparentTemperatureHighTime);
  let uvRating = interpret.uvIndexLevel(fetchedData.daily.uvIndex);
  
  console.log(`${fetchedData.location.name}:`);
  console.log(`It is ${fetchedData.current.temperature} degrees, but feels like ${fetchedData.current.apparentTemperature} degrees.`);
  console.log(`It will reach ${fetchedData.daily.temperatureHigh} degrees at ${hottestTime}.`)
  console.log(`It will feel the hottest at ${hottestApparentTime}`);
  console.log(`Maximum UV exposure will ${uvRating} and will be highest at ${uvHighTime}. `);
  console.log(`The air quality will be [good to bad]. It should be [easy to hard] to breathe.`)
};


/*
I: a number in the form of a unix time stamp
O: ??
C:
E:
What this fn does: It converts unix time to human readable time in the form of hh:mm, omitting seconds.
Relationship btwn inputs and outputs:
*/
var convertUnixtime = (unix_timestamp) =>{
 const date = new Date(unix_timestamp * 1000);
 return date.toLocaleTimeString();
};


//next up:
// https://developer.mapquest.com/documentation/geocoding-api/

// interpret air quality index (ozone)
// interpret UV Index
// XXX  convert unix time to people time and display
// let user save a default location and use a single letter command to access

/*
 1. write time conversion fn
 2. write ozone intpreting fn
 3. write UVI interpreting fn
 4+. Implement write file functionality
* */


// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript