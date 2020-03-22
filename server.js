var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io;

app.use('/',express.static(`${__dirname}/public`));

server = http.Server(app);
server.listen(3000);

io = socketIO(server);


function createNamespace(i){
    const group = io.of(`group-${i}`);
    group.on('connection',socket=>{
        socket.on('message.send',data=>{
            group.emit('message.sent',data);
        });
    });
}

const arr = [0,1];

arr.forEach(i=>{
    createNamespace(i);
});