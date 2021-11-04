'use strict'

const BaseWritable = require("stream").Writable;
const fs = require('fs')

class Writable extends BaseWritable {
  constructor(opts = {}) {
    super(opts)

    this._outputPath = opts.outputPath
  }

  _write(chunk, encoding, callback) {
    
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf8');
    }

    if (!this._outputPath) {
      process.stdout.write(chunk, callback);
    } else {
      fs.appendFile(this._outputPath, chunk, callback);
    }

  }

}

module.exports = Writable