const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(express.urlencoded({
    extended: true
  }));


//chargement de la page signup.html
app.get('/', (req, res) => {
 res.sendFile(__dirname + '/views/signup.html')
});
app.post('/submit-signup', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

    if(email && password && confirm_password && password === confirm_password){
        res.sendFile(__dirname + '/views/signin.html')
    } else {
        res.sendFile(__dirname + '/views/signup.html')
    }
});

//chargement de la page login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/signin.html')
});
app.post('/submit-login', (req, res) => {
    let email =  req.body.email;
    let password = req.body.password;

    if(email && password) {

    } else {
        
    }
});
// Chargement de la page index.html
app.get('/messenger', () => {
    res.sendFile(__dirname + '/views/index.html');
  });

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

server.listen(8080, ()=>{
    console.log("Server is listening on port 8080")
});