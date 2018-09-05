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

axios.get(geoCodeURL)
 .then((response) => {
   if (response.data.status === 'ZERO_RESULTS') {
     throw new Error('Gack! Address not found! What do I do? What do I DOOOO???');
   }
   
   var loc = {
     lat: response.data.results[0].geometry.location.lat,
     lng: response.data.results[0].geometry.location.lng,
     address: response.data.results[0].formatted_address
   };
   
   // var lat = response.data.results[0].geometry.location.lat;
   // var lng = response.data.results[0].geometry.location.lng;
   // var formattedAddress = response.data.results[0].formatted_address;
   var weather = `https://api.darksky.net/forecast/${darkSkyKey}/${loc.lat},${loc.lng}`;
   
   // console.log(response.data);
   // console.log(JSON.stringify(response.data, undefined, 2));
   console.log(loc.address);
   return axios.get(weather);
 })
  .then((response)=>{
    let temp = Math.round(response.data.currently.temperature);
    let apparentTemp = Math.round(response.data.currently.apparentTemperature);
    console.log(`The temperature is ${temp} but it feels like ${apparentTemp}`);
    
  })
  .catch((err)=>{
   if(err.code === 'ENOTFOUND') {
     console.log("Unable to connect to server. Why won't the other computers talk to me???");
   } else {
     console.log('thrown from .catch block',err.message);
   }
   
});
