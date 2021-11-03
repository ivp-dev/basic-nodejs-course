const fs = require('fs');
const process = require('process');
const child_process = require('child_process');

const writable_stream = require('./writable-stream');
const readable_stream = require('./readable-stream');

const get_arg_value = require('./get-arg-value')

const argv = process.argv.slice(2);

//available cli commands
const acmd = [
  ['-c', '--config', true  /*required*/], // config index:0
  ['-i', '--input', false  /*optional*/], // input  index:1
  ['-o', '--output', false /*optional*/]  // output index:2
];


const config_value = get_arg_value(argv, ...acmd[0]); //config value
const input_value = get_arg_value(argv, ...acmd[1]); //config value
const output_value = get_arg_value(argv, ...acmd[2]); //config value

if (input_value && fs.existsSync(input_value)) {
  const read = new readable_stream();
} else {

  

  process.stdin.on('data', (data) => {
    console.log(data)
  });

  process.on('SIGINT', () => {
    console.log("Intercepting SIGINT");
    process.exit(0)
  });
}