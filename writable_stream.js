var stream = require("stream").Writable;

stream.prototype._write = function(chunk, data){
  console.log(chunk.toString());
}

module.exports = stream