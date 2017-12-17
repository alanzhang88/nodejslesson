const utils = require('./utils.js');
const expect = require('expect');


//describe to classify test cases
describe('Utils',()=>{
  it('should add two numbers', () => {
    var res = utils.add(33,11);
    expect(res).toBe(44).toBeA('number');
    // if(res !== 44){
    //   throw new Error(`Value not correct, expect 44, actual ${res}`);//the way to throw error
    // }
  });

  //done to wait for callback to decide if tests has passed
  it('should asnc add two numbers',(done)=>{
    utils.asyncAdd(4,3,(sum)=>{
      expect(sum).toBe(7).toBeA('number');
      done();
    });
  });

  it('should square a number', ()=>{
    var res = utils.square(3);
    expect(res).toBe(9).toBeA('number');
    // if(res!==9){
    //   throw new Error(`Value not correct, expect 9, actual ${res}`);
    // }
  });

  it('should async square a number',(done)=>{
    utils.asyncSquare(3,(sum)=>{
      expect(sum).toBe(9).toBeA('number');
      done();
    })
  })
  it('should verify first name and last name are set',()=>{
    var user = {location: 'Los Angeles', age: 22};
    var res = utils.setName(user, 'Shuang Zhang');
    expect(user).toInclude({
      firstName:'Shuang',
      lastName:'Zhang'
    })
  });
});



// it('should expect some values',()=>{
//   // expect({name:'buLLDozER'}).toBe({name:'buLLDozER'}); //for objects cannot use toBe which uses true values(address)
//   // use toEqual instead for objects
//   expect({name:'buLLDozER'}).toEqual({name:'buLLDozER'});
//   expect([2,3,4]).toInclude(2);
//   expect([2,3,4]).toExclude(1);
//
// });
