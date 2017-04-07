var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var minimist = require('minimist');

var args = minimist(process.argv.slice(2), {
  default: {
    'port': 8080
  }
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(args.port, function(){
  console.log('listening on *:', args.port);
});
