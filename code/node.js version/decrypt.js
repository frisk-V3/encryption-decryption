import { webcrypto } from "crypto";
const crypto = webcrypto;

export async function decrypt(encryptedObj, password) {
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  const salt = Buffer.from(encryptedObj.salt, "base64");
  const iv = Buffer.from(encryptedObj.iv, "base64");
  const data = Buffer.from(encryptedObj.data, "base64");

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 150000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return dec.decode(decrypted);
}
