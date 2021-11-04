'use strict'

const fs = require('fs');
const process = require('process');
const validate_argv = require('./utils/validate_argv');
const getArgValue = require('./utils/get_arg_value');

const Readable = require('./streams/readable_stream');
const Writable = require('./streams/writable_stream');
const Transform = require('./streams/transform_stream');

const argv = process.argv.slice(2);

//available cli commands
const acmd = [
  ['-c', '--config', true  /*required*/], // config index:0
  ['-i', '--input', false  /*optional*/], // input  index:1
  ['-o', '--output', false /*optional*/]  // output index:2
];

//validate argv 
validate_argv(argv, acmd);

const inputPath = getArgValue(argv, ...acmd[1]);

if (inputPath) {

  if (!fs.existsSync(inputPath)) {
    throw new Error('File doesn\'t exist')
  }

  fs.createReadStream(inputPath)
    .pipe(new Transform({ config: getArgValue(argv, ...acmd[0]) }))
    .pipe(new Writable({ outputPath: getArgValue(argv, ...acmd[2]) }));

} else {

  const buffers = [];

  process.stdin.on('data', (data) => {
    buffers.push(data);
  });

  process.on('SIGINT', async () => {
    const buffer = Buffer.concat(buffers);

    Readable
      .from(buffer)
      .pipe(new Transform({ config: getArgValue(argv, ...acmd[0]) }))
      .pipe(new Writable({ outputPath: getArgValue(argv, ...acmd[2]) }))
      .on('finish', () => process.exit(0));
  });

}
