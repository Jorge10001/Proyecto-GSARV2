export function today() {
  return new Date().toLocaleDateString("es-EC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function uid(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}
