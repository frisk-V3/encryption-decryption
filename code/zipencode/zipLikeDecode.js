export function zipLikeDecode(encoded, key = "secret") {
  // 1. Base64を戻す
  const xorText = decodeURIComponent(escape(atob(encoded)));

  // 2. XORで元に戻す（同じ処理）
  let out = "";
  for (let i = 0; i < xorText.length; i++) {
    out += String.fromCharCode(
      xorText.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return out;
}
