function parseUrl(url) {
  var pattern = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*)");
  var parts = url.match(pattern);

  return {
    scheme: parts[2],
    authority: parts[4],
    path: parts[5],
    query: parts[7],
    fragment: matches[9]
  }
}
