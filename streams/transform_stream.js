'use strict'

const BaseTransform = require('stream').Transform;
const atbash = require('../encryptors/atbash');
const caeser = require('../encryptors/caeser');
const bufferToUtf8 = require('../utils/buffer_to_utf8');

class Transform extends BaseTransform {

  constructor(opts) {
    super(opts);

    this._transformConfig = opts.transformConfig;
  }

  _encode = (ch, cmd) => {
    switch (cmd[0]) {
      case 'A':
        return atbash(ch);
      case 'R':
        return caeser(ch, 8, cmd[1] == false);
      case 'C':
        return caeser(ch, 1, cmd[1] == false);
      default:
        return ch;
    }
  }

  _transform(chunk, _enc, callback) {

    let error;

    chunk = bufferToUtf8(chunk);

    try {

      const cmds = this._transformConfig.split('-');

      for (let idx = 0; idx < cmds.length; idx++) {
        chunk = [...chunk].map((ch) => this._encode(ch, cmds[idx])).join('');
      }

      this.push(chunk);
    }

    catch (err) {
      error = err;
    }

    if (callback) {
      callback(error);
    }
  }
}

module.exports = Transform;