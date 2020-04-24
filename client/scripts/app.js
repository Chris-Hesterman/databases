var App = {
  $spinner: $('.spinner img'),

  username: 'anonymous',
  roomname: 'main',

  initialize: function () {
    App.username = window.location.search.substr(10);
    Parse.newUser({ username: App.username });

    FormView.initialize();
    RoomsView.initialize();
    // MessagesView.initialize();
    Friends.initialize();
    Rooms.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
  },

  fetch: function (callback = () => {}) {
    $('#chats').empty();
    Parse.readAll((data) => {
      MessagesView.renderMessage(data);
    });
    callback();
  },

  refresh: function () {
    App.startSpinner();
    App.fetch();
  },

  startSpinner: function () {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function () {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
