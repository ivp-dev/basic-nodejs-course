# Ciphering CLI Tool

## This CLI tool is able to encode and decode a text by 3 substitution ciphers:
* [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
* [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)
* [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)

CLI tool may accept 3 options:

1.  **-c, --config**: config for ciphers (required)
2.  **-i, --input**: a path to input file (optional)
3.  **-o, --output**: a path to output file (optional)

**Usage example:**  

```bash
$ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

**The result of this command will be:** 

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`
