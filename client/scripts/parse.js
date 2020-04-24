var Parse = {
  server: `http://127.0.0.1:3000/classes/`,

  create: function (message, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: Parse.server + 'messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success:
        successCB ||
        function (data) {
          console.log('chatterbox: Message sent');
        },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  readAll: function (successCB, errorCB = null) {
    $.ajax({
      url: Parse.server + 'messages',
      type: 'GET',
      // data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error:
        errorCB ||
        function (error) {
          console.error('chatterbox: Failed to fetch messages', error);
        }
    });
  },
  newUser: function (user, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: Parse.server + 'users',
      type: 'POST',
      data: JSON.stringify(user),
      contentType: 'application/json',
      success:
        successCB ||
        function (data) {
          console.log('chatterbox: User added');
        },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to add User', data);
      }
    });
  },
  newRoom: function (room, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: Parse.server + 'rooms',
      type: 'POST',
      data: JSON.stringify(room),
      contentType: 'application/json',
      success:
        successCB ||
        function (data) {
          console.log('chatterbox: Room added');
        },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to add Room', data);
      }
    });
  }
};
