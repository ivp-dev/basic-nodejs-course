'use strict'

/**
 * Get argv value
 * @param {Array<string>} argv Array of the argument values 
 * @param {Array<string>} acmd Available cli commands
 * @returns {string} Argument value
 */
function getArgValue(argv, ...acmd) {
  let index = -1;

  for (let idx = 0; idx < acmd.length - 1 /*skip required flag*/; idx++) {
    const cmd = acmd[idx];
    index = argv.indexOf(cmd);

    if (index > -1 && index + 1 <= argv.length) {
      return argv[index + 1];
    }
  }
}

module.exports = getArgValue;