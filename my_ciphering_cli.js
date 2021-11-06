'use strict'

const fs = require('fs');
const process = require('process');
const validateArgv = require('./utils/validate_argv');
const validateConfig = require('./utils/validate_config');
const getArgValue = require('./utils/get_arg_value');
const ifError = require('./utils/if_error');
const Readable = require("stream").Readable;

const Transform = require('./streams/transform_stream');
const createWriteStream = require('./utils/create_write_stream');

//available cli commands
const acmds = [
  ['-c', '--config', true  /*required*/], // config index:0
  ['-i', '--input', false  /*optional*/], // input  index:1
  ['-o', '--output', false /*optional*/]  // output index:2
];

//romove exec file path and node path
const argv = process.argv.slice(2);

//try to validate argv
try {
  validateArgv(argv, acmds);
}
//if an error notify user and close with non zero code
catch (error) {
  ifError(error.message);
}

//get config arg value
const transformConfig = getArgValue(argv, ...acmds[0]);

//try to validate config chain
try {
  validateConfig(transformConfig);
}
//if error notify user and close with non zero code
catch (error) {
  ifError(error.message);
}

//get inputpath arg value
const inputPath = getArgValue(argv, ...acmds[1]);
//get outputpath arg value
const outputPath = getArgValue(argv, ...acmds[2]);
//if input set
if (inputPath) {
  //and file exists
  if (!fs.existsSync(inputPath)) {
    ifError('File doesn\'t exist');
  }

  //create read stream
  fs.createReadStream(inputPath)
    //transform 
    .pipe(new Transform({ transformConfig }))
    //write according with outputPath 
    //if it set write to file 
    //otherwise in stdout
    .pipe(createWriteStream(outputPath, { flags: 'a' /*append*/ }))
    .on('finish', () => process.exit(0));
}
//if input doesn't set read from stdin
else {

  const buffers = [];

  //run and listen data event
  process.stdin.on('data', (data) => {
    buffers.push(data);
  });

  //listen when user done and output transformed data
  process.on('SIGINT', () => {
    const buffer = Buffer.concat(buffers);

    Readable
      .from(buffer)
      .pipe(new Transform({ transformConfig }))
      //write according with outputPath 
      //if it set write to file 
      //otherwise in stdout
      .pipe(createWriteStream(outputPath, { flags: 'a' /*append*/ }))
      .on('finish', () => process.exit(0));
  });

}