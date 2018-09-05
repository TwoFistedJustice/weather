const weatherURL = `https://api.darksky.net/forecast/f250587e5f444faf3f0455781977444a/34.135653,-117.8287845`;
const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=91740`
const yargs = require('yargs');
const axios = require('axios');
const config = require('../config/config');
const darkSkyKey = config.darkSkyKey;

const argv = yargs
  .options({
    a: {
      describe: 'Get weather for a given location.',
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
  placeName: null,
  current: {
    temperature: null,
    apparentTemperature: null,
    uvIndex: null
  },
  daily: {
    summary: null,
    temperatureHigh: null,
    apparentTemperatureHigh:null,
    ozone: null,
    uvindex: null
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

   fetchedData.location.lat = response.data.results[0].geometry.location.lat;
   fetchedData.location.lng = response.data.results[0].geometry.location.lng;
   fetchedData.location.formatted = response.data.results[0].formatted_address;
   
   var weather = `https://api.darksky.net/forecast/${darkSkyKey}/${fetchedData.location.lat},${fetchedData.location.lng}`;
   fetchedData.location.name = response.data.results[0].address_components[1].short_name;
   
   return axios.get(weather);
 })
  .then((response)=>{
    let temp = Math.round(response.data.currently.temperature);
    let apparentTemp = Math.round(response.data.currently.apparentTemperature);
    console.log(`The temperature in ${fetchedData.location.name} is ${temp} but it feels like ${apparentTemp}`);
    
  })
  .catch((err)=>{
   if(err.code === 'ENOTFOUND') {
     console.log("Unable to connect to server. Why won't the other computers talk to me???");
   } else {
     console.log('thrown from .catch block',err.message);
   }
   
});
