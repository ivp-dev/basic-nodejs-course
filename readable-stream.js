var stream = require("stream").Readable;
import { access } from 'fs/promises';
import { constants } from 'fs';

import { open } from 'fs/promises';

stream.prototype._read = function (chunk, data) {
  console.log(chunk.toString());
}

async function createReadStream(filePath) {
  let file;

  if (!canRead(filePath)) {
    throw new Error('File can\'t be readed');
  }

  try {
    file = await open(filePath);
    

  } finally {
    file.close()
  }

  return new stream()
}

async function canRead(filePath) {
  let result;

  try {
    await access(filePath, constants.R_OK);
    result = true;
  } catch {
    result = false;
  }

  return result;

}

async function canWrite() {
  let result;

  try {
    await access(filePath, constants.W_OK);
    result = true;
  } catch {
    result = false;
  }

  return result;
}

async function canReadOrWrite() {
  let result;

  try {
    await access(filePath, constants.R_OK | constants.W_OK);
    result = true;
  } catch {
    result = false;
  }

  return result;
}

module.exports = stream