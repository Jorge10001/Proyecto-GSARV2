export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateDemoEmail(value) {
  return /^[^\s@]+@gsar\.example$/i.test(value);
}

export function isSafeHttpUrl(value) {
  if (typeof value !== "string" || !value.trim()) return false;

  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      Boolean(url.hostname)
    );
  } catch {
    return false;
  }
}

export function validateDemoPassword(value) {
  if (typeof value !== "string") return false;
  return value.length >= 10 && !/^password/i.test(value);
}
