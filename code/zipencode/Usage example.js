import { zipLikeEncode } from "./encode/zipLikeEncode.js";
import { zipLikeDecode } from "./decode/zipLikeDecode.js";

const key = "AYSGAME"; // プレイヤーが見つける鍵
const secret = "地下の扉は北に開く";

const encoded = zipLikeEncode(secret, key);
console.log("暗号:", encoded);

const decoded = zipLikeDecode(encoded, key);
console.log("復号:", decoded);
