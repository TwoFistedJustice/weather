// don't need any imports
// const _ = require('lodash');  // in case it's needed later
/*
I: a number
O: a string
C: number must be a positive integer
E: The input is less than zero (returns null)
What this fn does: It returns a string which depends on where the number falls on a pre-defined scale (ozone health). It
  tells the user the likely health and breathing impact of the days's ozone level.
Relationship btwn inputs and outputs: The output string is determined by where the number falls on the ozone health scale.
https://airnow.gov/index.cfm?action=aqibasics.aqi
*/
const ozoneLevel = (ozoneLevel) => {};


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