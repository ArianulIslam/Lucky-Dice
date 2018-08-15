var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SOCKET_LIST={};
var users =[];
var connections = [];
// Server
http.listen(process.env.PORT, function(){
  console.log('Server is running');
});


//rendering  view

app.get('/', function(req, res){
  res.sendFile(__dirname + '/view/chat.html');
});

app.get('/playnow', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res){
  res.sendFile(__dirname + '/about.html');
});
//static file
app.use('/public',express.static(__dirname + '/public'));



//socket Connection

io.on('connection', function(socket){
    
    connections.push(socket);
     updateUsernames();
    
     socket.id = Math.random();
    // socket.score = 0;
    // SOCKET_LIST[socket.id] = socket;
   
  console.log('user connected %s ', connections.length);
  
  socket.on('disconnect', function(){
    //if(!socket.username) return;
    users.splice(users.indexOf(socket.username),1);
     updateUsernames();
      connections.splice(connections.indexOf(socket),1);
    console.log('user disconnected %s ', connections.length);
  });
  
  socket.on('send message',function(data){
      io.sockets.emit('new message',{msg: data, user:socket.username});
    console.log(data);
  })
  
  
  socket.on('new user',function(data,callback){
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
    
  });
  
  function  updateUsernames(){
    io.sockets.emit('get users',users);
    
  }
  
  
});

// setInterval(function(){
//     var pack =[];
//     for(var i in SOCKET_LIST){
//         var socket = SOCKET_LIST[i];
        
//          socket.score++;
//          pack.push({
//              score :socket.score,
//          })
//     }
    
//   for(var i in SOCKET_LIST){
//          var socket = SOCKET_LIST[i];
//         socket.emit('score',pack);
        
//     }
    
    
    
    
// },1000/50)


