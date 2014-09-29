function quaryOnClick(info, tab) {
  var extractor = findExtractorById(info.menuItemId);
  var parsed = parseUrl(info.linkUrl);

  for each (var query in parsed.queries.split("&")) {
    var query = query.split("=");
    if (query[0] in extractor.queries) {
      confirmCopy(query[1])
    }
  }

  alert("No {} was found in the URL provided.".format(extractor.dataName);
  return null
}

function confirmCopy(textToCopy) {
  if (prompt("Press enter or CTR+C to copy", textToCopy) {
    window.execcommand("copy")
  }
}

var extractors = getExtractors();
base_extractor_context = ["link"];

for each (var extractor in extractors) {
  chrome.contextMenus.create({"id": extractor[id], "title"="Copy "+extractor.dataName, "contexts"=base_extractor_context, "onclick"=quaryOnClick)}
