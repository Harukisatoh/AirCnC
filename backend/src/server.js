const express = require('express'); //Importa a biblioteca express
const mongoose = require('mongoose'); //Importa a biblioteca mongoose (MongoDB)
const routes = require('./routes'); //Importa outro arquivo do projeto
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://{db_user}:{db_password}@mainserver-kdomb.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //Conecta com o banco de dados

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

io.

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

//app.get = Utilizado para leitura de algum dado do backend
//app.post = Utilizado para criação de algum dado no backend
//app.put = Utilizado para a edição de algum dado do backend
//app.delete = Utilizado para a exclusão de algum dado do backend

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json()); //Especifica para o express que o aplicativo utilizará formatos json
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); //Criação de uma rota que retorna a imagem quando passado uma url que contenha /files
app.use(routes); //Especifica para a aplicação quais são as rotas

server.listen(3333); //Configura qual porta será utilizada para a aplicação