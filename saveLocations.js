const fs = require('fs');
const _ = require('lodash');  // in case it's needed later


/*
I: an object holding a place name, latitude, and longtitude
O: a boolean indicating success or failure of operation
C: none
E: none
What this fn does: It saves the location entered by user to a file on localhost
Relationship btwn inputs and outputs: The output indicates whether the input successfully saved to a file.
*/

const displayLocations = () => {};
/*
I: none
O: a location object holding a place name, latitude, and longitude
C: none
E: none
What this fn does: It reads location data from a file on the localhost and returns an object.
Relationship btwn inputs and outputs: There are no inputs.
*/
const fetchLocation = () => {};
/*
supply a nickName
 -- used to reference data
 supply location name such as address or postal code
 fetch lat/long and save it

* */
/*
I: an object created extracted from fetchedData properties
O: none
C: none
E: none
What this fn does: It saves the location data passed in to a file on the user's system
Relationship btwn inputs and outputs: no outputs.
*/
const saveLocation = (placesArray) => {
  fs.writeFileSync('places.json', JSON.stringify(placesArray));
};


// first check for duplicate name OR duplicate coordinates
// if no dupes exist, save the place
// if a dupe exists, tell the user whether it is name or cooridnates
// if it's coordinates, tell user the name


const addPlace = (locationData) => {
  
  // fetch places and store in an array
  // check for duplicates
    // check name
   // check coordinates
   // inform user if either or both are dupes
  // if neither are dupes
    // push the arg onto the array and pass it to saveLocation
  
  // will need to change param name here
  saveLocation(locationData);
};

const deleteLocation = () => {};

module.exports = {
  displayLocations,
  fetchLocation,
  removeLocation: deleteLocation,
  saveLocation
};


//this is a comment