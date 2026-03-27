// ZIPみたいに「キーが無いと絶対読めない」文字化け暗号（ゲーム用）

export function zipLikeEncode(text, key = "secret") {
  // 1. XORでバイトをぐちゃぐちゃにする
  let xorOut = "";
  for (let i = 0; i < text.length; i++) {
    xorOut += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }

  // 2. Base64でさらに謎文字化
  return btoa(unescape(encodeURIComponent(xorOut)));
}
