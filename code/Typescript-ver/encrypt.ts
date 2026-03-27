import { webcrypto } from "crypto";
import { EncryptedData } from "./types";

const crypto = webcrypto;

export async function encrypt(text: string, password: string): Promise<EncryptedData> {
  const enc = new TextEncoder();

  // パスワード → キー素材
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // ランダム salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // PBKDF2 で強力な鍵を生成
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
    ["encrypt"]
  );

  // AES-GCM の IV
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );

  return {
    iv: Buffer.from(iv).toString("base64"),
    salt: Buffer.from(salt).toString("base64"),
    data: Buffer.from(new Uint8Array(encrypted)).toString("base64")
  };
}
