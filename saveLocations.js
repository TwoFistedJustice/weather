const fs = require('fs');
const _ = require('lodash');  // in case it's needed later
const geo = require('./geo');

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
I: geoData object, a string
O: data saved to a file
C: none
E: none
What this fn does: It checks the local file for duplicate entries, finding none, it saves the new entry.
Relationship btwn inputs and outputs: The file written is the location data with the nickname added to it.
 Requires user to use "-a" switch and gets the geodata from that.
 Fn is called from geoData fetch in app.js
*/
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
};

const deleteLocation = () => {};

module.exports = {
  addPlace,
  deleteLocation,
  fetchLocation
};

