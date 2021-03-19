const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  socket.on('create', ({ text, id, status }) => {
    io.emit('create', { text, id, status });
  });
  socket.on('delete', ({ id }) => {
    io.emit('delete', { id });
  });
  socket.on('edit', ({ text, id, status }) => {
    io.emit('edit', { text, id, status });
  });
});

http.listen(4000, function() {
  console.log('listening on port 4000');
});
