var FormView = {
  $form: $('form'),

  initialize: function () {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var messageText = $('#message').val();
    var message = {
      username: _.escape(App.username),
      message: _.escape(messageText),
      roomname: _.escape(App.roomname)
    };
    var successPost = function (message) {
      console.log(
        message.message + ' was successfully posted by ' + message.username
      );
    };
    Parse.create(message, successPost.bind(this, message));
    $('#send')[0].reset();
    console.log('click!');
    App.refresh();
  },

  setStatus: function (active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }
};
