
module.exports = {

  parseRecord: (record) => {
    return {
      date: new Date().getTime(),
      rawRecord: record,
    };
  }

};
