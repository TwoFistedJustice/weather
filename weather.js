const axios = require('axios');
const config = require('../../config/config');

var weatherData = {
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





var fetchWeather = (lat, lng) => {
  var weatherURL = `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`;
  
  axios.get(weatherURL)
    .then((response)=>{
      
      recordCurrentData(response.data.currently);
      recordDailyData(response.data.daily);
      displayWeatherReport();
      runCommands();
    })
    .catch((err)=>{
      if(err.code === 'ENOTFOUND') {
        console.log("Unable to connect to server. Why won't the other computers talk to me???");
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
