const gooleGeoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=91740`
const axios = require('axios');
const config = require('../../config/config');
const mapQuestKey = config.mapQuestNodeWeatherKey;

var geoData = {
    name: null,
    lat: null, //34.135653,
    lng: null //-117.8287845
  };

var fetchGeoData = (address) => {
  const encodedAddress = encodeURIComponent(address);
   const geoCodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${encodedAddress}`;
  
   return axios.get(geoCodeURL)
    .then((response) => {
      let errorcode = response.data.info.statuscode;
      if ( errorcode === 400) {
        throw new Error('Input error. You probably typed something wrong. Make sure you are passing a valid URL.');
      } else if (errorcode === 403) {
        throw new Error('Something is wrong with the API key. Make sure it is valid.');
      } else if (errorcode === 500) {
        throw new Error('Make sure you are entering a valid location. Could be a server error. Not really sure.')
      }
      
      setLocationData(response.data.results[0].locations[0]);
      return geoData;
    })
    .catch((err)=>{
      if(err.code === 'ENOTFOUND') {
        console.log("Unable to connect to MapQuest server.");
      } else {
        console.log(err.message);
      }
    });
};


var getGeoData = () => {
  return geoData;
};

var setLocationData = (geoResults) => {
  //geoReults is response.data.results[0]
  geoData.name = geoResults.adminArea5;
  geoData.lat = geoResults.latLng.lat;
  geoData.lng = geoResults.latLng.lng;
};

module.exports = {
  fetchGeoData,
  getGeoData
};