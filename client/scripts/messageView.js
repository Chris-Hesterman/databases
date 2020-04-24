var MessageView = {
  render: _.template(`
      <div class="chat">
        <div class="username"><%= _.escape((message.username)) %></div>
        <div class="post"><%= _.escape((message.message)) %></div>
      </div>
    `)
};
