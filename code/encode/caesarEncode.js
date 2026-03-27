export function caesarEncode(text, shift = 3) {
  return text.replace(/[a-zA-Z]/g, ch => {
    const base = ch >= "a" ? 97 : 65;
    return String.fromCharCode(
      ((ch.charCodeAt(0) - base + shift) % 26) + base
    );
  });
}
