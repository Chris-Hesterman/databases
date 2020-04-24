var RoomView = {
  render: _.template(`
    <option class="room" value="<%= room %>" selected><%= room %></option>
  `)
};
