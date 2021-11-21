'use strict'

const fs = require('fs');
const WritableToStdout = require('../streams/writable_stream');

function createWriteStream(outputFilePath, options) {
  if (outputFilePath) {
    return fs.createWriteStream(outputFilePath, options)
  }

  return new WritableToStdout(options);
}

module.exports = createWriteStream;