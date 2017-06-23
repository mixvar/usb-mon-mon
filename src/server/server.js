const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
app.set('port', port);

let serveContent;
if(process.env.STANDALONE_BACKEND){
  serveContent = (response) => response.send('<h1>usb-mon-mon back running!</h1>');
} else {
  app.use(express.static(path.join(__dirname, '../')));
  serveContent = (response) => response.sendFile(__dirname+"../index.html");
}

app.get('/', (request, response) => {
  serveContent(response);
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('a user connected!');

  socket.on('message', (msg) => {
    console.log('received message: ' + msg);
    io.emit('message', 'hello there!');
  });
});

server.listen(port, () => {
  console.log('usb-mon-mon running on port', app.get('port'));
});
