const fs = require('fs');
// const _ = require('lodash');  // in case it's needed later


/*
I: an object holding a place name, latitude, and longtitude
O: a boolean indicating success or failure of operation
C: none
E: none
What this fn does: It saves the location entered by user to a file on localhost
Relationship btwn inputs and outputs: The output indicates whether the input successfully saved to a file.
*/
const saveLocation = () => {};


/*
I: none
O: a location object holding a place name, latitude, and longitude
C: none
E: none
What this fn does: It reads location data from a file on the localhost and returns an object.
Relationship btwn inputs and outputs: There are no inputs.
*/
const fetchLocation = () => {};


module.exports = {
  saveLocation,
  fetchLocation
};