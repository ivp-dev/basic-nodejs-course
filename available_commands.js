//available cli commands
const acmds = [
    ['-c', '--config', true  /*required*/], // config index:0
    ['-i', '--input', false  /*optional*/], // input  index:1
    ['-o', '--output', false /*optional*/]  // output index:2
  ];

module.exports = acmds;