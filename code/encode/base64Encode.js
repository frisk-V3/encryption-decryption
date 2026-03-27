export function base64Encode(text) {
  return btoa(unescape(encodeURIComponent(text)));
}
