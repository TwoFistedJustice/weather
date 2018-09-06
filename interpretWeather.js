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
  tells the user the likliehood of sunburn and recommends sunscreen and hats as appropriate.
Relationship btwn inputs and outputs: The output string is determined by where the number falls on the UV Index  scale.
https://www.epa.gov/sunsafety/uv-index-scale-0
*/
const uvIndexLevel = (uvi) => {};



module.exports = {
  ozoneLevel,
  uvIndexLevel
  
};