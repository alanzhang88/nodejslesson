//use axios to perform request as promises
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
  .options({
    address:{
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather',
      string: true //always parse the param as string
    }
  }) //add flags
  .help()
  .alias('help','h') //set alias for an added flag
  .argv;

var userAddr = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddr}`;

//response.data to access the body of the return json

axios.get(geocodeUrl).then((response)=>{
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address'); //throw an error and let the catch block to handle
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/0d8f8e1bfee1ddfea30c1282ef5c3ab9/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response)=>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature} but it feels like ${apparentTemperature}`);
}).catch((e)=>{
  if(e.code==='ENOTFOUND'){
    console.log('Not able to connect to API servers');
  }
  else{
    console.log(e.message);
  }
});
