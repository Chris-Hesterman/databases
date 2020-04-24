var MessagesView = {
  $chats: $('#chats'),

  initialize: function () {
    setTimeout(function () {
      MessagesView.renderMessage(Messages.results);
    }, 2000);
  },

  filterMessages: function (messages) {
    var roomMessages = messages.filter((message) => {
      if (message.roomname === App.roomname) {
        return message;
      }
    });

    return roomMessages;
  },

  renderMessage: function (messages) {
    let html = '';

    if (App.roomname !== 'main') {
      messages = this.filterMessages(messages);
    }

    for (let post of messages) {
      html += MessageView.render({ message: post });
    }

    App.stopSpinner();
    $('#chats').append(html);
  }
};
