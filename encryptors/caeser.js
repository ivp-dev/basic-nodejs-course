function ceaser(ch, shift = 1, decoding = false) {

  const code = ch.charCodeAt(0);

  if (ch.match(/[a-zA-Z]/i)) {

    if (code >= 65 && code <= 90) {
      return String.fromCharCode(decoding ? 90 - (90 - code + shift) % 26 : 65 + (code - 65 + shift) % 26);
    }

    else if (code >= 97 && code <= 122) {
      return String.fromCharCode(decoding ? 122 - (122 - code + shift) % 26 : 97 + (code - 97 + shift) % 26);
    }

  }

  return ch;
}

module.exports = ceaser