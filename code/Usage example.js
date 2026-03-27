import {
  encodeByMode,
  decodeByMode,
  CryptoMode
} from "./cryptoGame.js";

const secret = "HELLO WORLD";

// 例: レベル1 → シーザー暗号
const encoded = encodeByMode(secret, CryptoMode.CAESAR, { shift: 5 });
// プレイヤーが解いたあとに答えチェック
const decoded = decodeByMode(encoded, CryptoMode.CAESAR, { shift: 5 });
console.log(encoded, decoded);
