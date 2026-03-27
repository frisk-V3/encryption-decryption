import { caesarEncode } from "./encode/caesarEncode.js";
import { xorEncode } from "./encode/xorEncode.js";
import { base64Encode } from "./encode/base64Encode.js";

import { caesarDecode } from "./decode/caesarDecode.js";
import { xorDecode } from "./decode/xorDecode.js";
import { base64Decode } from "./decode/base64Decode.js";

export const CryptoMode = {
  CAESAR: "caesar",
  XOR: "xor",
  BASE64: "base64"
};

export function encode(text, mode, opt = {}) {
  switch (mode) {
    case CryptoMode.CAESAR: return caesarEncode(text, opt.shift ?? 3);
    case CryptoMode.XOR:    return xorEncode(text, opt.key ?? "key");
    case CryptoMode.BASE64: return base64Encode(text);
    default: return text;
  }
}

export function decode(text, mode, opt = {}) {
  switch (mode) {
    case CryptoMode.CAESAR: return caesarDecode(text, opt.shift ?? 3);
    case CryptoMode.XOR:    return xorDecode(text, opt.key ?? "key");
    case CryptoMode.BASE64: return base64Decode(text);
    default: return text;
  }
}
