var socket = io();

function scrollToBotton(){
  // Selectors
  var messages = jQuery("#messages");
  var newMessage = messages.children('li:last-child');//the last li tag in the tag whose id is messages
  //Heights
  var clientHeight = messages.prop('clientHeight');//access DOM property
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);//setting scrollTop value to scrollHeight which goes to the end of the page
  }
}

socket.on("connect",function(){
  console.log("Connected to server");

  var params = jQuery.deparam(window.location.search);

  //emit a joint event to server to setup the room
  socket.emit("join",params,function(err){
    if(err){
      //we can manipulate which page the users are on by using href under location
      alert(err);
      window.location.href = "/";//redirect to index
    }
    else{
      console.log("No error");
    }
  });
});

socket.on("disconnect",function(){
  console.log("Disconnected from the server");
});

socket.on('updateUserList',function(users){
  console.log("Users list", users);
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);//add ol tag to the tag we select
});

socket.on("newMessage",function(msg){
  console.log("New message",msg);
  var formattedTime = moment(msg.createdAt).format("HH:mm");
  // var li = jQuery('<li></li>'); // li stands for list item
  // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
  //
  // jQuery('#messages').append(li);

  var template = jQuery('#message-template').html();//return the mark up in the code
  var html = Mustache.render(template,{
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBotton();
});

socket.on("newLocationMessage",function(msg){
  var formattedTime = moment(msg.createdAt).format("HH:mm");
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>'); //anchor tag, target = _blank so that clicking url will open new window instead of redirect
  // li.text(`${msg.from} ${formattedTime}: `);
  // a.attr('href', msg.url);
  // li.append(a);
  // jQuery('#messages').append(li);

  //select the tags need to template with mustache
  var template = jQuery("#location-message-template").html();
  //mustache inject templates
  var html = Mustache.render(template,{
    from: msg.from,
    createdAt: formattedTime,
    url: msg.url
  });
  jQuery('#messages').append(html);//send back to html and use css style to display
  scrollToBotton();
});

//the second function will be the acknowledgement that can be called by the server
// socket.emit("createMessage",{
//   from: 'Frank',
//   text: 'Hi',
//   createdAt: new Date().getTime()
// },function(data){
//   console.log("Got it ",data);
// });

//add a # to select id
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();//prevent default event

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val() //we select any element with name equal to message, val will gives it raw value
  },function(){
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  //geolocation built in most of browser
  if(!navigator.geolocation){
    return alert("Geolocation not supported by your browser");
  }
  locationButton.attr('disabled','disabled').text("Sending location...");//disable button
  //two functions, first one for success, second for failure
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text("Send location");//remove the attribute to enable button
    socket.emit("createLocationMessage",{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text("Send location");
    alert("Unable to fetch location");
  });
});
