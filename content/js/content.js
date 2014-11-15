function processRequest(message, sender, sendResponse) {
  console.log("Request received by content script:\n%s", JSON.stringify(message));
  if (!message) {
    message.data.status = MESSAGE.status.error;
    message.data.cause = MESSAGE.cause.noMessageProvided;
    response = getMessage(MESSAGE.response, data);
  }
  if (message.type == MESSAGE.notifyUser) {
    console.log("Found work to do.");
    notifyUser(message);
    message.data.status = MESSAGE.status.success;
    response = getMessage(MESSAGE.response, message.data);
    console.log("Response after showing message:\n%s", JSON.stringify(response));
  } else {
    message.data.status = MESSAGES.status.error;
    message.data.cause = MESSAGE.cause.statusNotSupported;
    response = getMessage(MESSAGE.response, data);
  }
  console.log("Sending response: %s", JSON.stringify(response));
  sendResponse(response);
}

function notifyUser(message) {
  var baseClass = "extractor-copy-notification";
  var cssClass, displayMessage;
  console.log("notifyUser received request: %s", JSON.stringify(message));
  if (message.data.status == MESSAGE.status.success) {
    cssClass = baseClass + " notify-success";
    displayMessage = message.data.extractedData + " was copied to your clipboard.";
  } else if (message.data.status == MESSAGE.status.error) {
    cssClass = baseClass + " error-warn";
    displayMessage = getClientError(message);
  } else {
    cssClass = baseClass;
    displayMessage = "Copying data: " + message.data.extractedData;
  }
  console.log("Sending message to user:\n%s", displayMessage);
  var notification = document.querySelector("."+baseClass);
  if (!notification) {
    var container = document.createElement("DIV");
    container.className = cssClass;
    var textContainer = document.createElement("SPAN");
    textContainer.className = "notification-text";
    textContainer.textContent = displayMessage;
    
    container.appendChild(textContainer);
    document.body.appendChild(container);
  } else {
    notification.class = cssClass;
    notification.textContent = displayMessage;
  }
  
  if (message.data.timeout === true) {
    setTimeout(function(){notification.parentNode.removeChild(notification)}, 10000);
  }
}

function getClientError(error) {
  request = getMessage(MESSAGE.logError, error.data);
  chrome.runtime.sendMessage(request);
  
  if (error.data.cause == MESSAGE.cause.dataNotFound) {
    return "Could not find %s in %s.".format(data.dataName, data.url);
  } else {
    console.log("Error was logged in background.");
    return "There was an unknown issue. It has been logged.";
  }
}

function init() {
  chrome.runtime.onMessage.addListener(processRequest);
}

init();
