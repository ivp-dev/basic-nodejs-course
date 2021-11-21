'use strict'

const fs = require('fs');
const WritaToStdout = require('../streams/writable_stream');

function createWriteStream(outputFilePath, options) {
  if (outputFilePath) {
    return fs.createWriteStream(outputFilePath, options)
  }

  return new WritaToStdout(options);
}

module.exports = createWriteStream;