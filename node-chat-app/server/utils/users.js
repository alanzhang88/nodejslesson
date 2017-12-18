// [{
//     id: '/#awdasda',
//     name: 'asd',
//     room: 'adsd'
// }]

//addUser(id,name,room)
//removeUser(id)
//getUser(id) -> object of above
//getUserList(room) -> a all user in a room

//use ES6 classes instead of some functions to manipulate a single array

// class Person{
//   constructor (name,age) {
//     //in constructor/other class functions this refer the instance not the whole class
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// };
//
// var me = new Person("Alan",22);
// var description = me.getUserDescription();
// console.log(description);

class Users{
  constructor (){
    this.users = [];
  }
  addUser (id,name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    //return user that was removed
    // var index = this.users.map((user)=>{
    //   return user.id;
    // }).indexOf(id);
    // var user = this.users[index];
    // this.users = this.users.splice(index,1);
    // return user;
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user)=>{
        return user.id !== id;
      });
    }
    return user;
  }
  getUser(id){
    return this.users.filter((user)=>{
      return user.id === id;
    })[0];
  }
  getUserList(room){
    //return an array of people in the room
    var users = this.users.filter((user)=>{
      return user.room === room;
    });
    var namesArray = users.map((user)=>{
      return user.name;
    });
    return namesArray;
  }
};

module.exports = {Users};
