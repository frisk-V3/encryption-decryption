export function base64Decode(b64) {
  return decodeURIComponent(escape(atob(b64)));
}
