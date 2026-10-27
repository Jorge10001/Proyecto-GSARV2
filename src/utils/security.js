const SENSITIVE_KEYS = new Set([
  "password",
  "passwordhash",
  "hash",
  "token",
  "accesstoken",
  "refreshtoken",
  "secret",
  "authorization",
  "apikey",
  "accesskey",
  "secretkey",
]);

export function sanitizeForExport(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForExport(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !SENSITIVE_KEYS.has(key.toLowerCase()))
        .map(([key, item]) => [key, sanitizeForExport(item)])
    );
  }

  return value;
}

export function sanitizeUser(user) {
  return sanitizeForExport(user);
}

export function buildDemoExport({ usuarios, solicitudes, mensajes }) {
  return sanitizeForExport({
    demo: true,
    exportedAt: new Date().toISOString(),
    usuarios,
    solicitudes,
    mensajes,
  });
}
