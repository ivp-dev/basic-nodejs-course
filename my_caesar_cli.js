const process = require('process');

const argv = process.argv.slice(2);

const available_commands = [
  ['-c', '--config', true  /*required*/], // config index:0
  ['-i', '--input', false  /*optional*/], // input  index:1
  ['-o', '--output', false /*optional*/]  // output index:2
];

const validate_argv = (argv) => {
  for (let idx = 0; idx < available_commands.length; idx++) {
    const cmd = available_commands[idx];
    const input_cmds = argv.reduce((acc, arg) => {

      if (arg === cmd[0] || arg === cmd[1]) {
        acc.push(arg)
      }

      return acc;
    }, [])

    if (input_cmds.length > 1) {
      throw new Error(`Parameter must be set once. Wrong parameter: ${cmd[0]} (${cmd[1]})`);
    } else if (!input_cmds.length && cmd[2]) {
      throw new Error(`Parameter ${cmd[0]} or ${cmd[1]} is required`);
    }
  }
}

const get_arg_value = (argv, acmv, idx) => {
  let index = argv.indexOf(acmv[idx][0]);

  if (index === -1) {
    index = argv.indexOf(acmv[idx][1]);
  }

  if (index > -1 && index + 1 <= argv.length) {
    return argv[index + 1];
  }
}

validate_argv(argv);

const config = argv.reduce((acc, arg) => {
  return acc;
}, {
  'nodePath': process.argv[0],
  'appPath': process.argv[1]
})

process.stderr.write(get_arg_value(argv, available_commands, 2));