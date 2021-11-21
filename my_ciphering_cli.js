'use strict'

const fs = require('fs');
const process = require('process');
const validateArgv = require('./utils/validate_argv');
const validateConfig = require('./utils/validate_config');
const getArgValue = require('./utils/get_arg_value');
const ifError = require('./utils/if_error');

const Transform = require('./streams/transform_stream');
const createWriteStream = require('./utils/create_write_stream');

const acmds = require('./available_commands');

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
    .pipe(createWriteStream(outputPath, { flags: 'a' /*append*/ }));
}
//if input doesn't set read from stdin
else {

  process.stdin
    .pipe(new Transform({ transformConfig }))
    .pipe(createWriteStream(outputPath, { flags: 'a' }));

}