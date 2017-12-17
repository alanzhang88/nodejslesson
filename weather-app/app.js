const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

  geocode.geocodeAddress(argv.address,(errorMessage,results)=>{
    if(errorMessage){
      console.log(errorMessage);
    }
    else{
      // console.log(JSON.stringify(results,undefined,2));
      console.log(results.Address);
      weather.getWeather(results.Latitude,results.Longtitude,(errorMessage,results) =>{
        if(errorMessage){
          console.log(errorMessage);
        }
        else{
          // console.log(JSON.stringify(results,undefined,2));
          console.log(`It's currently ${results.temperature} but it feels like ${results.apparentTemperature}`);
        }
      });
    }

  });



//https://api.darksky.net/forecast/0d8f8e1bfee1ddfea30c1282ef5c3ab9/37.8267,-122.4233

  // //encodeURIComponent(string) will encode the string to uri format
  // //decodeURICoponent(string) will decode the above
  //
  // var userAddr = encodeURIComponent(argv.address);
  // // console.log(userAddr);
  //
  // request({
  //   url:`https://maps.googleapis.com/maps/api/geocode/json?address=${userAddr}` ,
  //   json: true //want json data to comeback
  // },(error,response,body)=>{
  //   // console.log(JSON.stringify(body, undefined, 2));//pretty print
  //   if(error){
  //     console.log('Unable to connect to Google Server');
  //   }
  //   else if(body.status==='ZERO_RESULTS'){
  //     console.log('Unable to find address');
  //   }
  //   else if(body.status==='OK'){
  //     console.log(`Address: ${body.results[0].formatted_address}`);
  //     console.log(`Latitude: ${body.results[0].geometry.location.lat} \nLongtitude: ${body.results[0].geometry.location.lng}`);
  //   }
  // });
