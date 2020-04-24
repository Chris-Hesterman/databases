var Friends = {
  $chats: $('#chats'),

  friendsList: {},

  initialize: function() {
    this.$chats.on('click', (event) => {
      var username = _.escape(event.target.innerHTML);
      this.toggleStatus(username);
    });
  },

  toggleStatus: function(username) {
    if (this.friendsList[username] !== username) {
      this.friendsList[username] = username;
      this.colorFriendPosts();
    } else {
      delete this.friendsList[username];
      this.colorFriendPosts();
    }
  },

  colorFriendPosts: function() {
    let messages = $('.chat');

    for (let message of messages) {
      if (this.friendsList[message.children[0].innerText] !== undefined) {
        message.classList.add('friend');
      } else {
        message.classList.remove('friend');
      }
    }
  }
};
