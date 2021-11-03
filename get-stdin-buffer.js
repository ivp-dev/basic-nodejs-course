async function getStdinBuffer() {
  const result = []
  let length = 0;

  for await (const chunk of process.stdin) {
    result.push(chunk);
    length += chunk.length;
  }

  return Buffer.concat(result, length)
}

const getStdin = async () => {
  const buffer = await getStdinBuffer();
  return buffer.toString();
}

getStdin()