const request = require('request');

var geocodeAddress = (address) =>{

  return new Promise((resolve,reject)=>{
    var userAddr = encodeURIComponent(address);
    request({
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${userAddr}` ,
      json: true //want json data to comeback
    },(error,response,body)=>{

      if(error){
        reject('Unable to connect to Google Server');
      }
      else if(body.status==='ZERO_RESULTS'){
        reject('Unable to find address');
      }
      else if(body.status==='OK'){
        resolve({
          Address: body.results[0].formatted_address,
          Latitude: body.results[0].geometry.location.lat,
          Longtitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
}

geocodeAddress('90024').then((location)=>{
  console.log(JSON.stringify(location,undefined,2));
},(errorMessage)=>{
  console.log(errorMessage);
});
