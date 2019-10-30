const request = require('request');

const forecast = (longitude, latitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/5fa5e79c00b5e6db84b1e2e4bc09de25/'+ latitude + ',' + longitude + '?units=si';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log()
            callback('Unable to find location', undefined)
        } else {
            const summary = body.daily.data[0].summary;
            const temp = body.currently.temperature;
            const precip = body.currently.precipProbability;  
        callback(undefined,{ 
             summary:summary,
             temp:temp,
             precip:precip
        })
        }
    })
}
module.exports = forecast