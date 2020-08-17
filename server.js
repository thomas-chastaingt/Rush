//module exports
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const ent = require('ent');
var session = require('express-session')
const messenger = require('./routes/messenger');
const user =  require('./routes/user');

// settings
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
  }));


//routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/messenger', messenger);

app.use('/user', user);



//message server
io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
});


//server param
server.listen(8080, ()=>{
    console.log("Server is listening on port 8080")
});