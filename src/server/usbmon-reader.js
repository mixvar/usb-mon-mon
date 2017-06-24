const rx = require('rxjs/Rx');
const tail = require('tail').Tail;
const tailOptions = {
  fromBeginning: false,
  useWatchFile: true,
  fsWatchOptions: { interval: 100 }
};
const usbmonParser = require('./usbmon-parser');

let records_ = new rx.Subject;
let usbmonTail;

module.exports = {

  watch: (usbmonOut) => {
    console.log(`usbmon-reader watching file '${usbmonOut}'`);
    doStartWatching(usbmonOut);
  },

  pause: () => {
    console.log(`usbmon-reader pausing`);
    usbmonTail.unwatch();
  },

  resume: () => {
    console.log(`usbmon-reader resuming`);
    usbmonTail.watch();
  },

  getPackets: () => (
    records_
      .map(record => usbmonParser.parseRecord(record))
      .filter(packet => !packet.isInvalid)
  )
};

function doStartWatching(usbmonOut) {
  usbmonTail = new tail(usbmonOut, tailOptions);

  usbmonTail.on("line", (record) => {
    console.log(`received record: '${record}'`);
    records_.next(record);
  });

  usbmonTail.on("error", (error) => {
    console.error('error while reading usbmon file!: ', error);
  });
}
