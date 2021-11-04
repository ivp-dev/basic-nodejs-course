'use strict'

const BaseTransform = require('stream').Transform;

class Transform extends BaseTransform {
  
  constructor(opts) {
    super(opts);

    this._config = opts.config;
  }

  _transform(chunk, _enc, callback) {

    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf8');
    }

    let error;

    try {
      this.push(chunk.toString().toUpperCase());
    } catch (err) {
      error = err;
    }

    if (callback) {
      callback(error);
    }
  }
}

module.exports = Transform