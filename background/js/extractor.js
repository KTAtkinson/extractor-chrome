function copyDataToClipboard(data) {
  var toCopy = document.querySelector(".extracted-data");
  if (!toCopy) {
    toCopy = document.createElement("TEXTAREA");
    toCopy.className = "extracted-data";
    toCopy.value = data;
    document.body.appendChild(toCopy);
  } else {
    toCopy.value = data;
  }
  
  toCopy.select();function copyDataToClipboard(data) {
  var toCopy = document.querySelector(".extracted-data");
  if (!toCopy) {
    toCopy = document.createElement("TEXTAREA");
    toCopy.className = "extracted-data";
    toCopy.value = data;
    document.body.appendChild(toCopy);
  } else {
    toCopy.value = data;
  }
  
  toCopy.select();
  document.execCommand("copy", false, null);

  console.log("User notified that data was copied.");
}

function onClick(info, tab) {
  var promise = findExtractorById(info.menuItemId);
  var parsed = URI(info.linkUrl);
  var request;
  
  function notifyUserCallback(response) {
    console.log("Response is: %s", JSON.stringify(response));
    if (response.data.status == MESSAGE.status.success) {
      console.log("User notified that query is being copied.");
      copyDataToClipboard(response.data.extractedData);
      response.data.status = MESSAGE.status.success;
      response.data.timeout = true;
      var request = getMessage(MESSAGE.notifyUser, response.data);
      chrome.tabs.sendMessage(tab.id, request);
    } else {
      console.log("Was unable to copy data:\n%s", JSON.stringify(response.data));
    }
  }
  
  promise.then(function(extractor) {
   for (var i in extractor.queries) {
    var query = extractor.queries[i];
    if (parsed.hasQuery(query, true) === true) {
      var queries = URI.parseQuery(parsed.query());
      request = getMessage(MESSAGE.notifyUser, {
          'status': MESSAGE.status.inProgress,
          'dataName': extractor.dataName,
          'url': info.linkUrl,
          'queryParams': extractor.queries,
          'extractedData': queries[query],
          "timeout": false
          });
      chrome.tabs.sendMessage(tab.id, request, notifyUserCallback);
      return;
    }
  }
  request = getMessage(MESSAGE.notifyUser, {
  status: MESSAGE.status.error,
  cause: MESSAGE.cause.dataNotFound,
  queryParams: extractor.queries,
  url: info.linkUrl,
  timeout: true
  });
  
  chrome.tabs.sendMessage(tab.id, request);
  });
}

function routeRequest(request, sender, sendResponse) {
  var response;
  if (request.type == MESSAGE.logError) {
    console.log("Error %s occurred with data:\n%s", JSON.stringify(request.data.data));
    response = getMessage(MESSAGE.response, {'status': MESSAGE.status.success});
  } else {
    request.data.status = MESSAGE.status.error;
    request.data.cause = MESSAGE.status.messageTypeNotSupported;
    response = getMessage(MESSAGE.response, request.data);
    console.log("Error: recieved work request %s, this type not supported.", message.data.cause);
  }
  sendResponse(response);
}

function createMenuItems(items) {
  extractorContexts = ["all"];
  var extractor;
  
  for (var item in items) {
    extractor = items[item];
    console.log("Creating extractor: %s\nWith id: %s", extractor.dataName, extractor.id);
    chrome.contextMenus.create({
      "id": extractor.id,
      "title": "Copy "+extractor.dataName,
      "contexts": extractorContexts,
      "onclick": onClick});
  }
}

function init() {
  loadExtractors(createMenuItems);
  chrome.runtime.onMessage.addListener(routeRequest);
}

init();
function copyDataToClipboard(data) {
  var toCopy = document.querySelector(".extracted-data");
  if (!toCopy) {
    toCopy = document.createElement("TEXTAREA");
    toCopy.className = "extracted-data";
    toCopy.value = data;
    document.body.appendChild(toCopy);
  } else {
    toCopy.value = data;
  }
  
  toCopy.select();
  document.execCommand("copy", false, null);

  console.log("User notified that data was copied.");
}

function onClick(info, tab) {
  var promise = findExtractorById(info.menuItemId);
  var parsed = URI(info.linkUrl);
  var request;
  
  function notifyUserCallback(response) {
    console.log("Response is: %s", JSON.stringify(response));
    if (response.data.status == MESSAGE.status.success) {
      console.log("User notified that query is being copied.");
      copyDataToClipboard(response.data.extractedData);
      response.data.status = MESSAGE.status.success;
      response.data.timeout = true;
      var request = getMessage(MESSAGE.notifyUser, response.data);
      chrome.tabs.sendMessage(tab.id, request);
    } else {
      console.log("Was unable to copy data:\n%s", JSON.stringify(response.data));
    }
  }
  
  promise.then(function(extractor) {
   for (var i in extractor.queries) {
    var query = extractor.queries[i];
    if (parsed.hasQuery(query, true) === true) {
      var queries = URI.parseQuery(parsed.query());
      request = getMessage(MESSAGE.notifyUser, {
          'status': MESSAGE.status.inProgress,
          'dataName': extractor.dataName,
          'url': info.linkUrl,
          'queryParams': extractor.queries,
          'extractedData': queries[query],
          "timeout": false
          });
      chrome.tabs.sendMessage(tab.id, request, notifyUserCallback);
      return;
    }
  }
  request = getMessage(MESSAGE.notifyUser, {
  status: MESSAGE.status.error,
  cause: MESSAGE.cause.dataNotFound,
  queryParams: extractor.queries,
  url: info.linkUrl,
  timeout: true
  });
  
  chrome.tabs.sendMessage(tab.id, request);
  });
}

function routeRequest(request, sender, sendResponse) {
  var response;
  if (request.type == MESSAGE.logError) {
    console.log("Error %s occurred with data:\n%s", JSON.stringify(request.data.data));
    response = getMessage(MESSAGE.response, {'status': MESSAGE.status.success});
  } else {
    request.data.status = MESSAGE.status.error;
    request.data.cause = MESSAGE.status.messageTypeNotSupported;
    response = getMessage(MESSAGE.response, request.data);
    console.log("Error: recieved work request %s, this type not supported.", message.data.cause);
  }
  sendResponse(response);
}

function createMenuItems(items) {
  extractorContexts = ["all"];
  var extractor;
  
  for (var item in items) {
    extractor = items[item];
    console.log("Creating extractor: %s\nWith id: %s", extractor.dataName, extractor.id);
    chrome.contextMenus.create({
      "id": extractor.id,
      "title": "Copy "+extractor.dataName,
      "contexts": extractorContexts,
      "onclick": onClick});
  }
}

function init() {
  loadExtractors(createMenuItems);
  chrome.runtime.onMessage.addListener(routeRequest);
}

init();

  document.execCommand("copy", false, null);

  console.log("User notified that data was copied.");
}

function onClick(info, tab) {
  var promise = findExtractorById(info.menuItemId);
  var parsed = URI(info.linkUrl);
  var request;
  
  function notifyUserCallback(response) {
    console.log("Response is: %s", JSON.stringify(response));
    if (response.data.status == MESSAGE.status.success) {
      console.log("User notified that query is being copied.");
      copyDataToClipboard(response.data.extractedData);
      response.data.status = MESSAGE.status.success;
      var request = getMessage(MESSAGE.notifyUser, response.data);
      chrome.tabs.sendMessage(tab.id, request);
    } else {
      console.log("Was unable to copy data:\n%s", JSON.stringify(response.data));
    }
  }
  
  promise.then(function(extractor) {
   for (var i in extractor.queries) {
    var query = extractor.queries[i];
    if (parsed.hasQuery(query, true) === true) {
      var queries = URI.parseQuery(parsed.query());
      request = getMessage(MESSAGE.notifyUser, {
          'status': MESSAGE.status.inProgress,
          'dataName': extractor.dataName,
          'url': info.linkUrl,
          'queryParams': extractor.queries,
          'extractedData': queries[query]
          });
      chrome.tabs.sendMessage(tab.id, request, notifyUserCallback);
      return;
    }
  }
  request = getMessage(MESSAGE.notifyUser, {
  status: MESSAGE.status.error,
  cause: MESSAGE.cause.dataNotFound,
  queryParams: extractor.queries,
  url: info.linkUrl
  });
  
  chrome.tabs.sendMessage(tab.id, request);
  });
}

function routeRequest(request, sender, sendResponse) {
  var response;
  if (request.type == MESSAGE.logError) {
    console.log("Error %s occurred with data:\n%s", JSON.stringify(request.data.data));
    response = getMessage(MESSAGE.response, {'status': MESSAGE.status.success});
  } else {
    request.data.status = MESSAGE.status.error;
    request.data.cause = MESSAGE.status.messageTypeNotSupported;
    response = getMessage(MESSAGE.response, request.data);
    console.log("Error: recieved work request %s, this type not supported.", message.data.cause);
  }
  sendResponse(response);
}

function createMenuItems(items) {
  extractorContexts = ["all"];
  var extractor;
  
  for (var item in items) {
    extractor = items[item];
    console.log("Creating extractor: %s\nWith id: %s", extractor.dataName, extractor.id);
    chrome.contextMenus.create({
      "id": extractor.id,
      "title": "Copy "+extractor.dataName,
      "contexts": extractorContexts,
      "onclick": onClick});
  }
}

function init() {
  loadExtractors(createMenuItems);
  chrome.runtime.onMessage.addListener(routeRequest);
}

init();
