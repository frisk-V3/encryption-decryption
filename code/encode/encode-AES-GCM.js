export async function encrypt(text, keyString) {
  const enc = new TextEncoder();

  // キーをハッシュ化して32バイトにする
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(keyString),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("fixed-salt"), // 必要ならランダムにして保存
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12)); // 初期化ベクトル

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );

  // Base64化して文字列にする
  return {
    iv: btoa(String.fromCharCode(...iv)),
    data: btoa(String.fromCharCode(...new Uint8Array(encrypted)))
  };
}
