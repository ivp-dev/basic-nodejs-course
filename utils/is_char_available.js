function isCharAvailable(ch) {
  return !!(ch && ch.match(/[a-zA-Z]/i))
}

module.exports = isCharAvailable;