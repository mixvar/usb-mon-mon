const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const server = http.createServer(app);
const rx = require('rxjs/Rx');
const usbmonReader = require('./usbmon-reader');
const model = require('./model-enums');
const usbmonParser = require('./usbmon-parser');

const CHARTS_TIME_SLICE = 1000;

let serverStatus_ = new rx.ReplaySubject(1);
serverStatus_.next(model.ServerStatus.OK);

const port = process.env.PORT || 3000;
app.set('port', port);
let serveContent;
if (process.env.STANDALONE_BACKEND) {
  serveContent = (response) => response.send('<h1>usb-mon-mon back running!</h1>');
} else {
  app.use(express.static(path.join(__dirname, '../')));
  serveContent = (response) => response.sendFile(__dirname + '../index.html');
}

app.get('/', (request, response) => {
  serveContent(response);
});


const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('a user connected!');
  serverStatus_.subscribe( // memory leak
    (newStatus) => socket.emit('status', newStatus)
  );
});

server.listen(port, () => {
  console.log('usb-mon-mon running on port', app.get('port'));
});


const ubmonOut = process.env.USBMON_OUT.trim();
if (!ubmonOut) {
  console.error('missing USBMON_OUT env variable!');
  serverStatus_.next(model.ServerStatus.ERROR_NO_USBMON_OUT_PARAM);
} else {
  usbmonReader.watch(ubmonOut);
}

usbmonReader.getPackets()
  .bufferTime(500)
  .filter((packets) => packets.length > 0)
  .subscribe(
    (packets) => {
      io.emit('packets', packets)
    },
    (error) => {
      console.error('error while reading usbmon!', error);
      const errorStatus = (error.code === 'ENOENT')
        ? model.ServerStatus.ERROR_USBMON_OUT_NOT_FOUND
        : model.ServerStatus.ERROR_IO;
      serverStatus_.next(errorStatus);
    }
  );

usbmonReader.getPackets()
  .bufferTime(CHARTS_TIME_SLICE)
  .map((packets) => usbmonParser.reduceToTick(packets))
  .subscribe(
    (tick) => {
      io.emit('tick', tick)
    }
  );
