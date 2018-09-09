const fs = require('fs');
const _ = require('lodash');  // in case it's needed later
const geo = require('./geo');
/*
I: an object holding a place name, latitude, and longtitude
O: a boolean indicating success or failure of operation
C: none
E: none
What this fn does: It saves the location entered by user to a file on localhost
Relationship btwn inputs and outputs: The output indicates whether the input successfully saved to a file.
*/

const listPlaces = () => {};
/*
I: none
O: a location object holding a place name, latitude, and longitude
C: none
E: none
What this fn does: It reads location data from a file on the localhost and returns an object.
Relationship btwn inputs and outputs: There are no inputs.
*/
const fetchLocation = () => {
  try {
    return JSON.parse(fs.readFileSync('places.json'));
  }
  catch(error){
    return [];
  }
};

/*
supply a nickName
 -- used to reference data
 supply location name such as address or postal code
 fetch lat/long and save it
* */

// first check for duplicate name OR duplicate coordinates
// if no dupes exist, save the place
// if a dupe exists, tell the user whether it is name or cooridnates
// if it's coordinates, tell user the name

//addPlace will require user to use "-a" switch and get the geodata from that
const addPlace = (location, nickname) => {
  let places = fetchLocation();
  let duplicates = [];
  
  var duplicateTest = (item) => {
    return (item.nickname === nickname || (item.lat === location.lat && item.lng === location.lng))
  };
  
  duplicates = places.filter(duplicateTest)
  if (duplicates.length === 0) {
    location.nickname = nickname;
    places.push(location);
    fs.writeFileSync('./places.json', JSON.stringify(places, undefined, 2));
  } else {
    console.log("Duplicate location already saved.", duplicates[0]);
  }
  
  
  // make dupes array
  // filter places arrayfor duplicates (nickname or coords)
  // if there are duplicates
    // tell the user what is duplicated
  // if not, then add the new location to the places array
  // write the places array to file
  
  
  
};

const deleteLocation = () => {};

module.exports = {
  addPlace,
  deleteLocation,
  listPlaces,
  fetchLocation
};


//this is a cco