const weatherURL = `https://api.darksky.net/forecast/f250587e5f444faf3f0455781977444a/34.135653,-117.8287845`;
const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=91740`
const yargs = require('yargs');
const axios = require('axios');
const config = require('../config/config');
const darkSkyKey = config.darkSkyKey;

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

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

var fetchedData = {
  location: {
    name: null,
    lat: 34.135653,
    lng: -117.8287845,
    formatted: null
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
    apparentTemperatureHighTime:null,
    uvIndexTime:null
  }};

axios.get(geoCodeURL)
 .then((response) => {
   if (response.data.status === 'ZERO_RESULTS') {
     throw new Error('Gack! Address not found! What do I do? What do I DOOOO???');
   }
   
   recordLocationData(response.data.results[0]);
   
   var weatherData = `https://api.darksky.net/forecast/${darkSkyKey}/${fetchedData.location.lat},${fetchedData.location.lng}`;
   return axios.get(weatherData);
 })
  .then((response)=>{
  
    recordCurrentData(response.data.currently);
    recordDailyData(response.data.daily);
    // fetchedData.current.temperature = Math.round(response.data.currently.temperature);
    // fetchedData.current.apparentTemperature = Math.round(response.data.currently.apparentTemperature);
    // fetchedData.current.apparentTemperatureHigh = Math.round(response.data.daily.apparentTemperatureHigh);
    // fetchedData.current.ozone = Math.round(response.data.daily.ozone);
    // fetchedData.current.uvIndex = Math.round(response.data.daily.uvIndex);
    
    // console.log(JSON.stringify(response.data.daily.data[0], undefined, 2));
    console.log(JSON.stringify(fetchedData, undefined, 2));
    
    
    console.log(`The temperature in ${fetchedData.location.name} is ${fetchedData.current.temperature} but it feels like ${fetchedData.current.apparentTemperature}`);
  })
  .catch((err)=>{
   if(err.code === 'ENOTFOUND') {
     console.log("Unable to connect to server. Why won't the other computers talk to me???");
   } else {
     console.log('thrown from .catch block',err.message);
   }
});

var recordLocationData = (geoResults) => {
  //geoReults is response.data.results[0]
  fetchedData.location.name = geoResults.address_components[1].short_name;
  fetchedData.location.lat = geoResults.geometry.location.lat;
  fetchedData.location.lng = geoResults.geometry.location.lng;
  fetchedData.location.formatted = geoResults.formatted_address;
};


var recordCurrentData = (currently) => {
  fetchedData.current.temperature = Math.round(currently.temperature);
  fetchedData.current.apparentTemperature = Math.round(currently.apparentTemperature);
  fetchedData.current.uvIndex = Math.round(currently.uvIndex);
  
};


var recordDailyData = (daily) => {
  console.log(JSON.stringify(daily.data[0], undefined, 2));
  fetchedData.daily.summaryWeekly = daily.summary;
  fetchedData.daily.temperatureHigh = Math.round(daily.data[0].temperatureHigh);
  fetchedData.daily.apparentTemperatureHigh = Math.round(daily.data[0].apparentTemperatureHigh);
  fetchedData.daily.ozone = Math.round(daily.data[0].ozone);
  fetchedData.daily.uvIndex = Math.round(daily.data[0].uvIndex);
  fetchedData.time.apparentTemperatureHighTime = daily.data[0].apparentTemperatureHighTime;
  fetchedData.time.uvIndexTime = daily.data[0].uvIndexTime;
  
};