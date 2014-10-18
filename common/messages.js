var MESSAGE = {
  'request': 1,
  'notifyUser': 2,
  'logError': 3,
  'response': 4,

  'status': {
    'success': 1,
    'inProgress': 2,
    'error': 3
  },
  
  'cause': {
    'error': 1,
    'dataNotFound': 2,
    'typeNotSupported': 3,
    'noMessageProvided': 4
  }
}

function getMessage(type, data) {
  var message = {};
  if (!type) {
    return undefined;
  } else {
    message.type = type;
  }

  message.data = data;
  console.log("Message created: %s", JSON.stringify(message));
  return message;
}
