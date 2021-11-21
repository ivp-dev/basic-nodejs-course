const { describe, test, expect } = require('@jest/globals');
const { spawn } = require('child_process');
const stream = require('stream');
const fs = require('fs');
const path = require('path');

const temp_dir = './tmp';
const input_file_name = 'test_input.txt'
const output_file_name = 'test_output.txt'

const input_string = 'This is secret. Message about "_" symbol!';
const output_string = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!';

const input_file_path = path.join(temp_dir, input_file_name);
const output_file_path = path.join(temp_dir, output_file_name);


if (!fs.existsSync(temp_dir)) {
  fs.mkdirSync(temp_dir);
}

describe('cli tests', () => {

  test('stdin test', () => {

    const cli = spawn('node', ['my_ciphering_cli', '-c', 'C1-C1-R0-A']);
    const chunks = [];
    const stdin = new stream.Readable();

    stdin.push(input_string);
    stdin.push(null);

    stdin.pipe(cli.stdin);

    cli.stdout.on('data', (chunk) => chunks.push(chunk));
    cli.stdout.on('end', () => expect(Buffer.concat(chunks).toString()).toBe(output_string));

  })

  test('input exists test', () => {

    fs.writeFileSync(input_file_path, input_string, { flag: 'w' });

    const cli = spawn('node', ['my_ciphering_cli', '-c', 'C1-C1-R0-A', '-i', input_file_path]);
    const chunks = [];

    cli.stdout.on('data', (chunk) => chunks.push(chunk));

    cli.stdout.on('end', () => {
      expect(Buffer.concat(chunks).toString()).toBe(output_string);

      fs.unlink(input_file_path, () => { })
    });

  })

  test('input and output exist test', () => {

    fs.writeFileSync(input_file_path, input_string, { flag: 'w' });
    fs.writeFileSync(output_file_path, '', { flag: 'w' });

    const cli = spawn('node', ['my_ciphering_cli', '-c', 'C1-C1-R0-A', '-i', input_file_path, '-o', output_file_path]);

    cli.on('exit', () => {
     
      try {
        expect(fs.readFileSync(output_file_path).toString('utf8')).toBe(output_string);
      } finally {
        fs.unlink(input_file_path, () => {});
        fs.unlink(output_file_path, () => {});
      }
    })

  })

})