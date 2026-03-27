// cryptoGame.js
// NOTE: ゲーム用の簡易エンコード/デコード。セキュリティ目的では使わないこと。

/**
 * Caesar cipher (シーザー暗号)
 * shift分だけアルファベットをずらす
 */
export function caesarEncode(text, shift = 3) {
  return text.replace(/[a-zA-Z]/g, ch => {
    const base = ch >= "a" && ch <= "z" ? "a".charCodeAt(0) : "A".charCodeAt(0);
    const code = ch.charCodeAt(0) - base;
    const shifted = (code + shift) % 26;
    return String.fromCharCode(base + shifted);
  });
}

export function caesarDecode(text, shift = 3) {
  return caesarEncode(text, 26 - (shift % 26));
}

/**
 * XOR cipher (キー文字列でXOR)
 * 同じ関数でエンコード/デコード両方できる
 */
export function xorCipher(text, key = "key") {
  const keyLen = key.length;
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const t = text.charCodeAt(i);
    const k = key.charCodeAt(i % keyLen);
    out += String.fromCharCode(t ^ k);
  }
  return out;
}

/**
 * Base64 encode/decode（ゲーム内で「謎の文字列」演出に使える）
 */
export function encodeBase64(text) {
  return btoa(unescape(encodeURIComponent(text)));
}

export function decodeBase64(b64) {
  return decodeURIComponent(escape(atob(b64)));
}

/**
 * レベル別に「暗号方式」を切り替えるためのラッパー
 */
export const CryptoMode = {
  CAESAR: "caesar",
  XOR: "xor",
  BASE64: "base64"
};

export function encodeByMode(text, mode, options = {}) {
  switch (mode) {
    case CryptoMode.CAESAR:
      return caesarEncode(text, options.shift ?? 3);
    case CryptoMode.XOR:
      return xorCipher(text, options.key ?? "key");
    case CryptoMode.BASE64:
      return encodeBase64(text);
    default:
      return text;
  }
}

export function decodeByMode(text, mode, options = {}) {
  switch (mode) {
    case CryptoMode.CAESAR:
      return caesarDecode(text, options.shift ?? 3);
    case CryptoMode.XOR:
      return xorCipher(text, options.key ?? "key"); // XORは同じ関数で戻せる
    case CryptoMode.BASE64:
      return decodeBase64(text);
    default:
      return text;
  }
}
