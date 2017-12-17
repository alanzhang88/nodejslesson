const request = require('request');

function geocodeAddress(addr,callback){
  //encodeURIComponent(string) will encode the string to uri format
  //decodeURICoponent(string) will decode the above

  var userAddr = encodeURIComponent(addr);
  // console.log(userAddr);

  request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${userAddr}` ,
    json: true //want json data to comeback
  },(error,response,body)=>{
    // console.log(JSON.stringify(body, undefined, 2));//pretty print
    if(error){
      // console.log('Unable to connect to Google Server');
      callback('Unable to connect to Google Server');
    }
    else if(body.status==='ZERO_RESULTS'){
      // console.log('Unable to find address');
      callback('Unable to find address');
    }
    else if(body.status==='OK'){
      callback(undefined,{
        Address: body.results[0].formatted_address,
        Latitude: body.results[0].geometry.location.lat,
        Longtitude: body.results[0].geometry.location.lng
      });
      // console.log(`Address: ${body.results[0].formatted_address}`);
      // console.log(`Latitude: ${body.results[0].geometry.location.lat} \nLongtitude: ${body.results[0].geometry.location.lng}`);
    }
  });
}

module.exports = {geocodeAddress};
