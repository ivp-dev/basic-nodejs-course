var stream = require("stream").Readable;

stream.prototype._read = function(chunk, data){
  console.log(chunk.toString());
}

function createReadStream(filePath) {
  return new stream({
    
  })
} 

module.exports = stream