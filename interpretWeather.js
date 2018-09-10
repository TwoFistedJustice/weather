// don't need any imports
// const _ = require('lodash');  // in case it's needed later
/*
I: a number
O: a string
C: number must be a positive integer
E: The input is less than zero (returns null)
What this fn does: It returns a string which depends on where the number falls on a pre-defined scale (aqiUS health). It
  tells the user the likely health and breathing impact of the days's aqiUS level.
Relationship btwn inputs and outputs: The output string is determined by where the number falls on the aqiUS health scale.
https://airnow.gov/index.cfm?action=aqibasics.aqi
US EPA  AQI fetched from Air Visual API
*/
const ozoneLevel = (aqiUS) => {
  if (aqiUS < 0 || typeof aqiUS !== 'number') {
    return null;
  } else if (aqiUS <= 50) {
    return 'good. Go out. Have fun.';
  } else if (aqiUS <= 100) {
    return 'meh. You might want to go easy.';
  } else if (aqiUS <= 150) {
    return 'pretty bad. Don\'t do more than you need to.';
  } else if (aqiUS <= 200) {
    return 'unhealthy. Do as little physical activity as you can get away with. ';
  } else if (aqiUS <= 300) {
    return 'VERY UNHEALTHY. Do nothing. All day. Just sit there. Seriously.';
  } else if (aqiUS > 300) {
    return 'DOWNRIGHT DANGEROUS. Just don\'t breath.'
  }
};

/*
I: a number
O: a string
C: number must be a positive integer
E: The input is less than zero (returns null)
What this fn does: It returns a string which depends on where the number falls on a pre-defined scale (UV Index ). It
  tells the user the level of UV radiation based on EPA guidelines
Relationship btwn inputs and outputs: The output string is determined by where the number falls on the UV Index  scale.
https://www.epa.gov/sunsafety/uv-index-scale-0
*/
const uvIndexLevel = (uvi) => {
  
  if (uvi < 0 || typeof uvi !== 'number') {
    return null;
  } else if (uvi <= 2) {
    return 'low';
  } else if (uvi <= 5) {
    return 'moderate';
  } else if (uvi <= 7) {
    return 'High';
  } else if (uvi <= 10) {
    return 'Very High';
  } else if (uvi > 10) {
    return 'EXTREME';
  }
};

module.exports = {
  ozoneLevel,
  uvIndexLevel
};