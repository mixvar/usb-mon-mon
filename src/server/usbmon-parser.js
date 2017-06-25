const ParsableString = require('./ParsableString');
const model = require('./model-enums');


module.exports = {

  parseRecord: (record) => {
    const packet = {
      date: new Date().getTime(),
      rawRecord: record,
    };

    try {
      packet.parsedData = parseContent(record);
    } catch (error) {
      console.warn(`error while parsing record '${record}'!`, error);
      packet.isInvalid = true;
    }

    return packet;
  }

};

function parseContent(rawRecord) {
  validateRecord(rawRecord);
  const record = new ParsableString(rawRecord);
  let parsedData = {};

  parsedData.urbTag = parseUrbTag(record.takeWord());
  parsedData.timestamp = parseTimestamp(record.takeWord());
  parsedData.eventType = parseEventType(record.takeWord());

  Object.assign(parsedData, parseAddress(record.takeWord()));

  const statusField = record.takeWord();
  if (/[a-zA-Z]/.test(statusField)) {
    parsedData.setupPacket = parseSetupPacket(statusField, record.takeWords(5));
  } else {
    parsedData.urbStatus = parseUrbStatus(statusField);
  }

  if (parsedData.urbType === model.UrbType.Isochronous) { // TODO verify
    const isochronousDescritorsCount = +record.takeWord();
    if (isNaN(isochronousDescritorsCount))
      throw new Error(`expected to find isochronousDescritorsCount (number), but found: '${isochronousDescritorsCount}'!`);
    parsedData.isochronousFrameDescriptors = parseIsochronousFrameDescriptors(
      record.takeWords(isochronousDescritorsCount)
    );
  }

  Object.assign(parsedData, parseData(record.value));

  return parsedData;
}

function validateRecord(record) {
  if (record === null || record === undefined)
    throw new Error('record is null!');

  if (record.trim().length === 0)
    throw new Error('record is empty!');
}

function parseUrbTag(value) {
  return value;
}

function parseTimestamp(value) {
  if (isNaN(+value) || +value < 0)
    throw new Error(`invalid timestamp: '${value}'`);
  return +value;
}

function parseEventType(value) {
  switch (value.toUpperCase()) {
    case 'S':
      return model.EventType.Submission;
    case 'C':
      return model.EventType.Callback;
    case 'E':
      return model.EventType.SubmissionError;
    default:
      throw new Error(`unrecognized event type: '${value}'!`);
  }
}

function parseAddress(value) {
  const address = new ParsableString(value, ':');
  let parsedData = {};

  const typeDir = address.takeWord();
  parsedData.urbType = parseUrbType(typeDir.charAt(0));
  parsedData.direction = parseDircetion(typeDir.charAt(1));


  parsedData.busNumber = parseBusNumber(address.takeWord());
  parsedData.deviceAddress = parseDeviceAddress(address.takeWord());
  parsedData.endpointNumber = parseEndpointNumber(address.takeWord());

  if (!address.isEmpty())
    throw new Error(`invalid address: '${value}'!`);

  return parsedData;
}

function parseUrbType(value) {
  switch (value.toUpperCase()) {
    case 'C':
      return model.UrbType.Control;
    case 'Z':
      return model.UrbType.Isochronous;
    case 'I':
      return model.UrbType.Interrupt;
    case 'B':
      return model.UrbType.Bulk;
    default:
      throw new Error(`unrecognized urb type: '${value}'!`);
  }
}

function parseDircetion(value) {
  switch (value.toUpperCase()) {
    case 'I':
      return model.Direction.Input;
    case 'O':
      return model.Direction.Output;
    default:
      throw new Error(`unrecognized direction: '${value}'!`);
  }
}

function parseBusNumber(value) {
  if (isNaN(+value))
    throw new Error(`invalid bus number: '${value}'!`);
  return +value;
}

function parseDeviceAddress(value) {
  if (isNaN(+value))
    throw new Error(`invalid device address: '${value}'!`);
  return +value;
}

function parseEndpointNumber(value) {
  if (isNaN(+value))
    throw new Error(`invalid endpoint number: '${value}'!`);
  return +value;
}

function parseSetupPacket(setupTag, setupPacketData) {
  const setupPacket = { setupTag };

  if (setupTag === 's') { // safe to decode
    setupPacket.bmRequestType = setupPacketData[0];
    setupPacket.bRequest = setupPacketData[1];
    setupPacket.wValue = setupPacketData[2];
    setupPacket.wIndex = setupPacketData[3];
    setupPacket.wLength = setupPacketData[4];
  }

  return setupPacket;
}

function parseUrbStatus(value) {
  const urbStatusData = value.split(':');

  function getUrbStatusDataIfPresent(index) {
    if (index >= urbStatusData.length)
      return undefined;
    const val = urbStatusData[index];
    return (val === '' || isNaN(val)) ? undefined : +val;
  }

  return {
    status: urbStatusData[0],
    interval: getUrbStatusDataIfPresent(1),
    startFrame: getUrbStatusDataIfPresent(2),
    errorCount: getUrbStatusDataIfPresent(3),
  }
}

function parseIsochronousFrameDescriptors(descriptors) {
  if (!descriptors.every(d => (/(\d+):(\d+):(\d+)/.test(d))))
    throw new Error(`could not parse isochronousFrameDescriptors : '${descriptors}'!`);

  return descriptors;
}

function parseData(value) {
  const parsable = new ParsableString(value);
  const output = { dataBytesCount: +parsable.takeWord() };

  if (isNaN(output.dataBytesCount))
    throw new Error(`expected to find dataSize (number), but found: '${dataSize}'!`);

  if (output.dataBytesCount !== 0) {
    const dataTag = parsable.takeWord();
    if (dataTag === '=') {
      output.data = parsable.value;
    }
  }

  return output;
}
