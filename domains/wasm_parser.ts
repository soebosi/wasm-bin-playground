const MAGIC_WORD = "0061736d";
const VERSION = "01000000";

type WasmModule = {
  type: string;
  body: string;
};

type WasmRoot = {
  type: "root";
  body: Array<WasmModule>;
};

export function parse(hexStr: string): WasmRoot {
  const trimmedStr = hexStr.replaceAll("\n", "").replaceAll(" ", "");
  const magicWord = trimmedStr.substring(0, 8);
  if (magicWord !== MAGIC_WORD) {
    throw new Error(`expected magic word 00 61 73 6d, actual: ${magicWord}`);
  }
  const version = trimmedStr.substring(8, 16);
  if (version !== VERSION) {
    throw new Error(`expected version 01 00 00 00, actual: ${version}`);
  }
  return {
    type: "root",
    body: [
      {
        type: "magic",
        body: magicWord,
      },
      {
        type: "version",
        body: version,
      }
    ]
  };
}
