const process = require('process');

const argv = process.argv.slice(2);

//available cli commands  
const acmd = [
  ['-c', '--config', true  /*required*/], // config index:0
  ['-i', '--input', false  /*optional*/], // input  index:1
  ['-o', '--output', false /*optional*/]  // output index:2
];

/**
 * Validate input commands
 * @param {*} argv 
 * @param {*} acmd 
 */
const validate_argv = (argv, acmd) => {
  for (let idx = 0; idx < acmd.length; idx++) {
    const cmd = acmd[idx];
    const input_cmd = argv.reduce((acc, arg) => {

      if (arg === cmd[0] || arg === cmd[1]) {
        acc.push(arg)
      }

      return acc;
    }, [])

    if (input_cmd.length > 1) {
      throw new Error(`Parameter must be set once. Wrong parameter: ${cmd[0]} (${cmd[1]})`);
    } else if (!input_cmd.length && cmd[2]) {
      throw new Error(`Parameter ${cmd[0]} or ${cmd[1]} is required`);
    }
  }
}

/**
 * Get argv value
 * @param {*} argv 
 * @param  {...any} acmd 
 * @returns 
 */
const get_arg_value = (argv, ...acmd) => {
  let index = -1;

  for (let idx = 0; idx < acmd.length; idx++) {
    const cmd = acmd[idx];
    index = argv.indexOf(cmd);

    if (index !== -1) {
      return argv[index + 1];
    }
  }
}

validate_argv(argv, acmd);

const arg_value = get_arg_value(argv, ...acmd[0]);
if (typeof arg_value !== 'undefined') {
  process.stderr.write(arg_value);
}