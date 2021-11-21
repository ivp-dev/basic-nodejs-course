function bufferToUtf8(maybeBuffer) {
  if (Buffer.isBuffer(maybeBuffer)) {
    return maybeBuffer.toString('utf8');
  }

  return maybeBuffer;
}

module.exports = bufferToUtf8;