const request = require('request');

const geocode = (address , callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYWJkbzk4IiwiYSI6ImNrMXF5aG1uZjAyMTUzZm1vN3ZlbHM5aDgifQ.3rmXUwMws4ZwpRfRnzdrcw&limit=1"
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!',undefined)
        }else if(body.message){
            callback(body.message,undefined)
        } 
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            const latitude = body.features[0].center[0];
            const longitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            
            callback(undefined,{
                latitude:latitude,
                longitude:longitude,
                location:location
            })
        }
      })
}
module.exports = geocode;