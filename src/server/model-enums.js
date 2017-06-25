module.exports = {

  ServerStatus: {
    OK: 0,
    ERROR_NO_USBMON_OUT_PARAM: 1,
    ERROR_USBMON_OUT_NOT_FOUND: 2,
    ERROR_IO: 3,
    ERROR_INTERNAL: 4,
  },

  EventType: {
    Submission: 0,
    Callback: 1,
    SubmissionError: 2,
  },

  UrbType: {
    Control: 0,
    Isochronous: 1,
    Interrupt: 2,
    Bulk: 3,
  },

  Direction: {
    Input: 0,
    Output: 1,
  },

};
