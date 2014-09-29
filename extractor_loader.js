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

function getOptions() {
  return chrome.storage.sync.get(DEFAULTS)
}

function getExtractors() {
  return getOptions().extractors
}

function findExtractorById(id) {
  for (var extractor in getExtractors()) {
    if (extractor.id == id) {
      return extractor
    }
  }

  return nil
}

