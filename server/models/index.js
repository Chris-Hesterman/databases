var db = require('../db');

var queryAllMessages =
  'SELECT messages.message, rooms.roomname, users.username FROM messages, rooms, users WHERE messages.rooms_id_room = rooms.id AND messages.users_id_user = users.id ORDER BY messages.timestamp DESC;';

var postMessage = `INSERT INTO messages (id, message, users_id_user, rooms_id_room, timestamp)
  VALUES (null, ?, (SELECT id FROM users WHERE username = ?), (SELECT id FROM rooms WHERE roomname = ?), NOW());`;

var queryAllUsers = `SELECT users.username, rooms.roomname FROM users, rooms
  WHERE users.rooms_id_currentRoom = rooms.id;`;

var checkUserExists = `SELECT CASE WHEN EXISTS (SELECT username FROM users WHERE username = ?)
  THEN 1
  ELSE 0
  END;`;

var checkRoomExists = `SELECT CASE WHEN EXISTS (SELECT roomname FROM rooms WHERE roomname = ?)
  THEN 1
  ELSE 0
  END;`;

var postUser = `INSERT INTO users (id, username, rooms_id_currentRoom, createdAt, updatedAt) VALUES (null, ?, (SELECT id FROM rooms WHERE roomname = 'main'), NOW(), NOW());`;

var postRoom = `INSERT INTO rooms (id, roomname, createdAt, updatedAt) VALUES (null, ?, NOW(), NOW());`;

module.exports = {
  messages: {
    get: function (roomData) {
      return db.query(queryAllMessages, { type: db.QueryTypes.SELECT });
    }, // a function which produces all the messages
    post: function (postData) {
      var parameters = [postData.message, postData.username, postData.roomname];
      return db.query(postMessage, {
        replacements: parameters
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      return db.query(queryAllUsers, {
        type: db.QueryTypes.SELECT
      });
    },
    post: function (usernameData) {
      var parameters = [usernameData.username];
      return db
        .query(checkUserExists, {
          replacements: parameters,
          type: db.QueryTypes.SELECT
        })
        .then((results) => {
          var boolean;
          for (var key in results[0][0]) {
            boolean = results[0][0][key];
          }
          if (!boolean) {
            return db.query(postUser, {
              replacements: parameters
              // type: db.QueryTypes.INSERT
            });
          } else {
            return 'User already exists!';
          }
        });
    }
  },

  rooms: {
    // Ditto as above.
    get: function () {
      return db.query('SELECT roomname FROM rooms;', {
        type: db.QueryTypes.SELECT
      });
    },
    post: function (roomnameData) {
      var parameters = [roomnameData.roomname];

      return db
        .query(checkRoomExists, {
          replacements: parameters,
          type: db.QueryTypes.SELECT
        })
        .then((results) => {
          var boolean;
          for (var key in results[0]) {
            boolean = results[0][key];
          }
          if (!boolean) {
            return db.query(postRoom, {
              replacements: parameters,
              type: db.QueryTypes.INSERT
            });
          } else {
            return 'Room already exists';
          }
        });
    }
  }
};
