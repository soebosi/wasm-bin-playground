import { assertEquals } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import { decodeLEB128 } from "./leb128_decoder.ts";

const TESTCASE: Array<[string, number]> = [
  ["87808000", 0x7],
  ["87818000", 0x87],
  ["87818100", 0x4087]
];

for (let [input, output] of TESTCASE) {
  Deno.test(`LEB128: ${input}が${output}にデコードされること`, () => {
    const [actual, _] = decodeLEB128(input);
    assertEquals(actual, output);
  });
}

Deno.test("デコードが完了した位置から残りのHEX文字列を返すこと", () => {
  const [_, actual] = decodeLEB128("87878080001234");
  assertEquals(actual, "1234");
});
