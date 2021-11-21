const { describe, test, expect } = require('@jest/globals');
const acmds = require('../available_commands');

const buffer_to_utf8 = require('../utils/buffer_to_utf8');
const validate_argv = require('../utils/validate_argv');
const validate_config = require('../utils/validate_config');
const is_char_available = require('../utils/is_char_available');

describe('utils tests', () => {

  test('buffer_to_utf8 test', () => {
    //if param passed as buffer function convert the buffer to a string
    expect(buffer_to_utf8(Buffer.from('abc'))).toBe('abc');
    //if string param result will be the same string
    expect(buffer_to_utf8('abc')).toBe('abc');
  });

  test('validate_argv test', () => {
    //valid args
    expect(() => validate_argv('-c "C1-C1-R0-A"'.split(' '), acmds)).not.toThrow();
    //valid args
    expect(() => validate_argv('-c "C1-C1-R0-A" -i "./input.txt"'.split(' '), acmds)).not.toThrow();
    //valid args
    expect(() => validate_argv('-c "C1-C1-R0-A" -o "./output.txt"'.split(' '), acmds)).not.toThrow();
    //valid args
    expect(() => validate_argv('-c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"'.split(' '), acmds)).not.toThrow();
    //valid args
    expect(() => validate_argv('--config "C1-C1-R0-A" --input "./input.txt" --output "./output.txt"'.split(' '), acmds)).not.toThrow();

    //duplicate output param
    expect(() => validate_argv('-c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt" --output "./output.txt"'.split(' '), acmds)).toThrow();
    //duplicate input param
    expect(() => validate_argv('-c "C1-C1-R0-A" -i "./input.txt" --input "./input.txt" -o "./output.txt"'.split(' '), acmds)).toThrow();
    //duplicate config
    expect(() => validate_argv('-c "C1-C1-R0-A" --config "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"'.split(' '), acmds)).toThrow();

    //duplicate output param with short notation
    expect(() => validate_argv('-c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt" -o "./output.txt"'.split(' '), acmds)).toThrow();
    //duplicate input param with short notation
    expect(() => validate_argv('-c "C1-C1-R0-A" -i "./input.txt" -i "./input.txt" -o "./output.txt"'.split(' '), acmds)).toThrow();
    //duplicate config with short notation
    expect(() => validate_argv('-c "C1-C1-R0-A" -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"'.split(' '), acmds)).toThrow();

    //check required config
    expect(() => validate_argv([], acmds)).toThrow();
  })

  test('validate_config test', () => {
    //valid config with all available inputs
    expect(() => validate_config('C1-C0-R0-R1-A')).not.toThrow();

    //lower case not valid
    expect(() => validate_config('c1')).toThrow();
    //available only 0 or 1 second param
    expect(() => validate_config('C2')).toThrow();
    //atbash should be without second param
    expect(() => validate_config('A1')).toThrow();
    //empty string not expected
    expect(() => validate_config('')).toThrow();
  });

  test('available chars', () => {
    for(let i = 0; i <= 255; i++) {
      expect(is_char_available(String.fromCharCode(i))).toBe((i >= 65 && i <= 90) || (i >= 97 && i <= 122));
    }
  })

})

