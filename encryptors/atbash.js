function atbash(ch) {
  
  const code = ch.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    return String.fromCharCode(155 /*90 + 65*/ - code)
  }

  else if (code >= 97 && code <= 122) {
    return String.fromCharCode(219 /*122 + 97*/ - code)
  }

  return ch;
}

module.exports = atbash