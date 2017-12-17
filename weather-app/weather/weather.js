const request = require('request');

//37.8267,-122.4233

var getWeather = (lat,lng,callback) =>{
  request({
    url: `https://api.darksky.net/forecast/0d8f8e1bfee1ddfea30c1282ef5c3ab9/${lat},${lng}`,
    json: true
  },(error,response,body) =>{
    if(!error && response.statusCode === 200){
        // console.log(body.currently.temperature);
        callback(undefined,{
            temperature : body.currently.temperature,
            apparentTemperature : body.currently.apparentTemperature
        });
    }
    else {
        // console.log("Unable to fetch weather");
        callback("Unable to fetch weather");
    }
  });
}

module.exports = {getWeather}
