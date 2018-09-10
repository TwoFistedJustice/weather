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
const fetchLocations = () => {
  try {
    return JSON.parse(fs.readFileSync('places.json'));
  }
  catch(error){
    return [];
  }
};

/*
I: a string (the name of the saved location you want to retrieve)
O: an object
C: none
E: the input is not saved to the local file
What this fn does: It retrieves one set of location data from localhost
Relationship btwn inputs and outputs: The output is parsed json data retrieved from localhost where the
  name or nickname property matches the input.
*/
const fetchOneLocation = (placeName) => {

  let places = fetchLocations();
  let test = (item) => {
    return item.name === placeName || item.nickname === placeName;
  }
  let place = places.filter(test);
  
  if(place.length === 1) {
    return place[0];
  } else {
    return null;
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
  let places = fetchLocations();
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

/*
I: a string
O: none
C: input must be a saved location
E: input location does not exist
What this fn does: It searches the saved locations for the input string, and finding it removes it.
Relationship btwn inputs and outputs: no outputs
*/
const deleteLocation = (placeName) => {
  let places = fetchLocations();
  let test =(item) => {
    return (item.nickname !== placeName);
  };
  let filteredPlaces = places.filter(test);

  fs.writeFileSync('./places.json', JSON.stringify(filteredPlaces, undefined, 2));
};

module.exports = {
  addPlace,
  deleteLocation,
  fetchLocations,
  fetchOneLocation
};

