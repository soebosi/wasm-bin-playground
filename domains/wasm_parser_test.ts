import {
  assertEquals,
  assertThrows
} from "https://deno.land/std@0.74.0/testing/asserts.ts";
import { parse } from "./wasm_parser.ts";

const WASM_STRING = `
00 61 73 6d 01 00 00 00
01 87 80 80 80 00 01 60
02 7f 7f 01 7f 03 82 80
80 80 00 01 00 07 87 80
80 80 00 01 03 61 64 64
00 00 0a 8d 80 80 80 00
01 87 80 80 80 00 00 20
00 20 01 6a 0b
`;

const INVALID_MAGIC_WORD = `
00 62 73 6d
`;

const INVALID_VERSION = `
00 61 73 6d 01 00 00 01
`;

// https://webassembly.github.io/spec/core/binary/modules.html#binary-module
Deno.test(
  "The encoding of a module starts with a preamble containing a 4-byte magic number (the string ‘∖0asm’) and a version field.",
  () => {
    const ast = parse(WASM_STRING);
    assertEquals(ast.body[0].type, "magic");
    assertEquals(ast.body[0].body, "0061736d");
    assertEquals(ast.body[1].type, "version");
    assertEquals(ast.body[1].body, "01000000");
  }
);

Deno.test("Occur error when invalid magic word", () => {
  assertThrows(
    () => {
      parse(INVALID_MAGIC_WORD);
    },
    Error,
    "expected magic word 00 61 73 6d, actual: 0062736d",
  );
});

Deno.test("Occur error when invalid version", () => {
  assertThrows(
    () => {
      parse(INVALID_VERSION);
    },
    Error,
    "expected version 01 00 00 00, actual: 01000001",
  );
});
