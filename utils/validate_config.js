'use strict'

/**
 * Validate configuration string with pattern {XY(-)}n. 
 * @param {string} config
 * @returns {boolean} 
 */
function validateConfig(config){
  if(!config || !config.match(/^((([RC][01])|([A]))[-]?)+$/)) {
    throw new Error('Config doesn\'t match required pattern. Should be {XY(-)}n');
  }
}

module.exports = validateConfig