var DEFAULTS = {
  extractors: [
    {
      name: "YouTube Video ID",
      dataName: "YouTube Video ID",
      queries: ["v", "video_id"],
      id: "default",
      isActive: true,
    }
  ],
  isSet: false
}

function loadOptions(callback) {
  chrome.storage.sync.get(DEFAULTS, callback);
}

function loadObjectDeferred() {
  console.log("Creating deferral...");
  var d = Q.defer();
  chrome.storage.sync.get(DEFAULTS, function(data) {
    d.resolve(data);
  });
  console.log("Deferred call for options.");
  return d.promise;
}

function loadExtractors(callback) {
  loadOptions(function(data) {
    var extractors = data.extractors;
    callback(extractors);
  });
}

function loadExtractorsDeferred() {
  var d = Q.defer();
  loadObjectDeferred().then(function(data) {
    console.log("Options loaded: %s", data);
    d.resolve(data.extractors);
  });
  return d.promise;
}

function findExtractorById(id) {
  d = Q.defer();
  
  loadExtractorsDeferred().then(function(extractors) {
    console.log("Found extractors: %s", extractors[0].id);
    for (var eindex in extractors) {
      console.log(eindex);
      var extractor = extractors[eindex];
      console.log("Examining %s", extractor.id);
      if (id == extractor.id) {
        d.resolve(extractor);
      }
      return;
    }
    console.log("Extractor %s not found.", id);
    d.resolve();
  });
  
  return d.promise;
}


