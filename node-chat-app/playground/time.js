//moment is the go-to library for dates in JS
var moment = require("moment");

var date = moment();
date.add(1,"year");
//triple M means short hand of months, YYYY full years,
console.log(date.format("MMM Do, YYYY HH:mm"));


var createdAt = new Date().getTime();
var curdate = moment(createdAt);
console.log(curdate.format("MMM Do, YYYY HH:mm"));

console.log(moment().valueOf());//ms since epoch
