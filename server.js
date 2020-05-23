const http = require('http');
const app = require('./app');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = socketIO(server);
app.set('socketio', io);

server.listen(port);
