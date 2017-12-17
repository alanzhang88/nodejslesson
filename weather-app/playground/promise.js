//if the promise is fulfilled i.e. has done something you want, resolve will be the callback to go
//if the promise is not finished, the reject will be the callback to handle
//Can only pass one parameter to resolve and reject
//You can either resolve or reject a promise once, you cannot both resolve and reject a promise
//Do not need to worry about callback function being called multiple times
var asyncAdd = (a,b) => {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }
      else{
        reject('Arguments must be numbers');
      }
    },1500);
  });
}

//the catch will catch all errors in the then and handle then.
asyncAdd(5,7).then((res)=>{
  console.log('Result: ',res);
  return asyncAdd(res,33);
}).then((res)=>{
  console.log('Result: ',res);
}).catch((errorMessage)=>{
  console.log(errorMessage);
});

//
// var somePromise = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     // resolve('Hey. It worked!');
//     reject('Unable to fulfill promise');
//   },2500);
//
// });
//
// somePromise.then((msg) =>{
//     console.log('Success: ', msg);
// }, (errorMessage)=>{
//   console.log('Error: ',errorMessage);
// });
