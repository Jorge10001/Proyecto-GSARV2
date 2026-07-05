function getInitialRoute() {
  return window.location.hash.replace("#", "") || "/login";
}

function routeTo(path) {
  window.location.hash = path;
}
