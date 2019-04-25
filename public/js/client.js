$( document ).ready(function() {
  /* global io */
  var socket = io();
  // listens for the user event and data object sent
  socket.on('user', function(data){
  console.log(data);
    let users = "user";
    if (data.currentUsers>1){
      users = users +s;
    }
    $('#num-users').text(data.currentUsers+ ' '+ users + ' online');
    var message = data.name;
    if (data.connected){
    message+=' has joined the chat.';
    } else {
    message+=' has left the chat.';
    }
    $('#messages').append($('<li>').html('<b>'+message+'</b></li>'));

  });

  // disconnects from chat
  socket.on('disconnect', function(){
  });


  // Form submittion with new message in field with id 'm'
  $('form').submit(function(){
    var messageToSend = $('#m').val();
    //send message to server here?
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });


  socket.on('chat message', (message)=>{
  $('#messages').append($('<li>').html('<b>'+message.name+': '+message.message+'</b></li>'));
  });


});
