'use strict'

const BaseWritable = require("stream").Writable;

class Writable extends BaseWritable {

  _write(chunk, encoding, callback) {
    
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf8');
    }

    process.stdout.write(chunk, callback);
  }
  
}

module.exports = Writable