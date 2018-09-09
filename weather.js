const axios = require('axios');
const config = require('../../config/config');
const darkSkyKey = config.darkSkyKey;

var weatherData = {
  name: null,
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

var fetchWeather = (geoData) => {
  var weatherURL = `https://api.darksky.net/forecast/${darkSkyKey}/${geoData.lat},${geoData.lng}`;
   weatherData.name = geoData.name;
  return axios.get(weatherURL)
    .then((response)=>{
      
      recordCurrentData(response.data.currently);
      recordDailyData(response.data.daily);
      return weatherData;
    })
    .catch((err)=>{
      if(err.code === 'ENOTFOUND') {
        console.log("Unable to connect to Dark Sky server.");
      } else {
        console.log(err.message);
      }
    });
};

var recordCurrentData = (currently) => {
  weatherData.current.temperature = Math.round(currently.temperature);
  weatherData.current.apparentTemperature = Math.round(currently.apparentTemperature);
  weatherData.current.uvIndex = Math.round(currently.uvIndex);
};

var recordDailyData = (daily) => {
  // console.log(JSON.stringify(daily.data[0], undefined, 2));
  weatherData.daily.summaryWeekly = daily.summary;
  weatherData.daily.temperatureHigh = Math.round(daily.data[0].temperatureHigh);
  weatherData.daily.apparentTemperatureHigh = Math.round(daily.data[0].apparentTemperatureHigh);
  weatherData.daily.ozone = Math.round(daily.data[0].ozone);
  weatherData.daily.uvIndex = Math.round(daily.data[0].uvIndex);
  weatherData.time.apparentTemperatureHighTime = daily.data[0].apparentTemperatureHighTime;
  weatherData.time.temperatureHighTime = daily.data[0].temperatureHighTime;
  weatherData.time.uvIndexTime = daily.data[0].uvIndexTime;
};


module.exports = {
  fetchWeather
};