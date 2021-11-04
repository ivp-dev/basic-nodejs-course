'use strict'

const BaseReadable = require("stream").Readable;

class Readable extends BaseReadable {
  _inputPath;

  constructor(opts = {}) {
    super(opts)

    this._inputPath = opts.inputPath
  }

  _read(chunk, encoding, callback) {

    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf8');
    }

    this.push(chunk)

    callback();

  }

}

module.exports = Readable