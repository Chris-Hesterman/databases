let s = require('./db');
let S = require('sequelize');

var Users = s.define('Users', {
  username: S.STRING(25),
  rooms_id_currentRoom: S.INTEGER
});

var Rooms = s.define('Rooms', {
  roomname: S.STRING(25)
});

var Messages = s.define(
  'messages',
  {
    message: S.STRING,
    users_id_user: S.INTEGER,
    rooms_id_room: S.INTEGER
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: 'timestamp'
  }
);

var Friends = s.define('friends', {
  users_id_user: S.INTEGER,
  users_id_friend: S.INTEGER
});

s.query('SET FOREIGN_KEY_CHECKS = 0').then(() => {
  s.sync().then(() => {
    s.query(
      'ALTER TABLE users ADD FOREIGN KEY(rooms_id_currentRoom) REFERENCES rooms (id);'
    )
      .then(() => {
        s.query(
          'ALTER TABLE messages ADD FOREIGN KEY(users_id_user) REFERENCES users (id);'
        );
      })
      .then(() => {
        s.query(
          'ALTER TABLE messages ADD FOREIGN KEY(rooms_id_room) REFERENCES rooms (id);'
        );
      })
      .then(() => {
        s.query(
          'ALTER TABLE friends ADD FOREIGN KEY(users_id_user) REFERENCES users (id);'
        );
      })
      .then(() => {
        s.query(
          'ALTER TABLE friends ADD FOREIGN KEY(users_id_friend) REFERENCES users (id);'
        );
      })
      .then(() => {
        s.query(
          `INSERT INTO rooms(id, roomname, createdAt, updatedAt) VALUES(null, 'main', NOW(), NOW())`
        );
      })
      .then(() => {
        s.query('SET FOREIGN_KEY_CHECKS = 1');
      });
  });
});

module.exports.Users = Users;
module.exports.Rooms = Rooms;
module.exports.Messages = Messages;
module.exports.Friends = Friends;
