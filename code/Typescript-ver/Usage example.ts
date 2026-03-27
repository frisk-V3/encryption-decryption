import { encrypt } from "./crypto/encrypt";
import { decrypt } from "./crypto/decrypt";

async function main() {
  const password = "AYSGAME-SECRET-KEY";
  const text = "地下の扉は北に開く";

  const encrypted = await encrypt(text, password);
  console.log("暗号:", encrypted);

  const decrypted = await decrypt(encrypted, password);
  console.log("復号:", decrypted);
}

main();
