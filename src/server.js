import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

const port = 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('dist'));

io.on('connection', function(socket){
  console.log('user connected -> id: ', socket.id);
  socket.on('disconnect', () => console.log('user disconnected'));
  socket.on('chat message', (message) => {
    socket.broadcast.emit('chat message', { message, userId: socket.id });
    console.log('chat message: ', message)
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
