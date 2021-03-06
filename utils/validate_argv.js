'use strict'

/**
 * Validate input commands
 * @param {Array<string>} argv
 * @param {Array<string>} acmds
 */
function tryValidateArgv(argv, acmds) {
  
  for (let idx = 0; idx < acmds.length; idx++) {
    const cmd = acmds[idx];
    const input_cmd = argv.reduce((acc, arg) => {

      if (arg === cmd[0] || arg === cmd[1]) {
        acc.push(arg)
      }

      return acc;
    }, []);

    //cmd should be single
    if (input_cmd.length > 1) {
      throw new Error(`Parameter must be set once. Wrong parameter: ${cmd[0]} (${cmd[1]})`);
    }

    //check if cmd is required
    if (!input_cmd.length && cmd[2]) {
      throw new Error(`Parameter ${cmd[0]} or ${cmd[1]} is required`);
    }

  }
}

module.exports = tryValidateArgv;