const axios = require('axios');
const config = require('../../config/config');
const darkSkyKey = config.darkSkyKey;
const airVisualKey = config.airVisualKey;

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
    aqiUS: null,  // set from Air Visual API
    uvIndex: null
  },
  time: {
    apparentTemperatureHighTime:null,
    temperatureHighTime: null,
    uvIndexTime:null
  }};

var fetchWeather = (geoData) => {
  var weatherEndPoint = `https://api.darksky.net/forecast/${darkSkyKey}/${geoData.lat},${geoData.lng}`;
   weatherData.name = geoData.name;
  return axios.get(weatherEndPoint)
    .then((response)=>{
      recordCurrentData(response.data.currently);
      recordDailyData(response.data.daily);
      const aqiEndPoint  = `https://api.airvisual.com/v2/nearest_city?lat=${geoData.lat}&lon=${geoData.lng}&key=${airVisualKey}`;
      return axios.get(aqiEndPoint);
    }).then((response)=>{
      weatherData.daily.aqiUS = response.data.data.current.pollution.aqius;
      return weatherData;
    })
    .catch((err)=>{
      if(err.code === 'ENOTFOUND') {
        console.log("Unable to connect to Dark Sky server.");
      } else {
        console.log("Unable to connect to Dark Sky server.\n" + err.message);
      }
    });
};

var recordCurrentData = (currently) => {
  weatherData.current.temperature = Math.round(currently.temperature);
  weatherData.current.apparentTemperature = Math.round(currently.apparentTemperature);
  weatherData.current.uvIndex = Math.round(currently.uvIndex);
};

var recordDailyData = (daily) => {
  weatherData.daily.summaryWeekly = daily.summary;
  weatherData.daily.temperatureHigh = Math.round(daily.data[0].temperatureHigh);
  weatherData.daily.apparentTemperatureHigh = Math.round(daily.data[0].apparentTemperatureHigh);
  weatherData.daily.uvIndex = Math.round(daily.data[0].uvIndex);
  weatherData.time.apparentTemperatureHighTime = daily.data[0].apparentTemperatureHighTime;
  weatherData.time.temperatureHighTime = daily.data[0].temperatureHighTime;
  weatherData.time.uvIndexTime = daily.data[0].uvIndexTime;
};


module.exports = {
  fetchWeather
};