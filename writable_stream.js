var BaseWritable = require("stream").Writable;

class Writable extends BaseWritable {
  constructor(opts) {
    super(opts)
  }

  _write(chunk, data) {
    console.log(chunk)
  }

}

module.exports = Writable