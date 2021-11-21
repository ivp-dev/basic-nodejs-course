const { describe, test, expect } = require('@jest/globals');

const atbash = require('../encryptors/atbash');
const ceaser = require('../encryptors/caeser');

describe('encryptors tests', () => {

  test('atbash test', () => {
    expect(atbash('a')).toEqual('z');
    expect(atbash('A')).toEqual('Z');
  });

  test('ceaser tests', () => {
    expect(ceaser('a')).toEqual('b');
    expect(ceaser('A')).toEqual('B');

    expect(ceaser('a', 2)).toEqual('c');
    expect(ceaser('A', 2)).toEqual('C');

    expect(ceaser('c', 2, true)).toEqual('a');
    expect(ceaser('C', 2, true)).toEqual('A');

    expect(ceaser('a', 2, false)).toEqual('c');
    expect(ceaser('A', 2, false)).toEqual('C');
  })
})

