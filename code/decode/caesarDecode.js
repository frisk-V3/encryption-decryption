import { caesarEncode } from "../encode/caesarEncode.js";

export function caesarDecode(text, shift = 3) {
  return caesarEncode(text, 26 - (shift % 26));
}
