'use strict'

function ifError(errorMessage) {
  process.stderr.write(errorMessage);
  process.exit(1);
}

module.exports = ifError;