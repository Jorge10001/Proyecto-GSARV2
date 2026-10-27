export function getInitialRoute() {
  return window.location.hash.replace("#", "") || "/login";
}

export function routeTo(path) {
  window.location.hash = path;
}
