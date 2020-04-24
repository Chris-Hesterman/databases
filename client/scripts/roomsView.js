var RoomsView = {
  $refreshbutton: $('.refresh'),
  $select: $('#rooms select'),

  initialize: function () {
    this.$refreshbutton.on('click', App.refresh);
    this.$select.change((event) => {
      App.roomname = event.target.value;
      App.refresh();
    });
  },

  renderRoom: function (room) {
    var html = '';
    // let newRoom = App.roomname;
    html += RoomView.render({ room: room });
    this.$select.append(html);
    App.refresh();
  }
};
