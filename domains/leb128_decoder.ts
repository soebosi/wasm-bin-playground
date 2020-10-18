export function decodeLEB128(hexString: string): [number, string] {
  let ret = 0;
  let rest = "";
  for (let i = 0; i * 2 < hexString.length; i++) {
    const byte = parseInt(hexString.substring(i * 2, i * 2 + 2), 16);
    ret += (byte & 0x7f) << (i * 7);
    if ((byte & 0x80) !== 0x80) {
      rest = hexString.substring(i * 2 + 2);
      break;
    }
  }
  return [ret, rest];
}
