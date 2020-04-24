var db = require('../db');

var queryAllMessages = `SELECT messages.message, rooms.roomname, users.username
  FROM messages, rooms, users
  WHERE messages.rooms_id_room = rooms.id
  AND messages.users_id_user = users.id`;

var postMessage = `INSERT INTO messages (id, message, users_id_user, rooms_id_room, timestamp)
  VALUES (null, 'Hi Hi Hi', 1, 1, NOW())`;

var queryAllUsers = `SELECT users.username, rooms.roomname FROM users, rooms
  WHERE users.rooms_id_currentRoom = rooms.id`;

var checkUserExists = `CASE WHEN EXISTS (SELECT username FROM users WHERE username = 'Miss Piggy')
  THEN 1
  ELSE 0
  END CASE`;

var postUser = `INSERT INTO users (id, username, rooms_id_currentRoom) VALUES (null, )`;

module.exports = {
  messages: {
    get: function () {
      return new Promise((resolve, reject) => {
        db.query(queryAllMessages, (err, results) => {
          if (err) {
            return reject(err);
          }

          resolve(results);
        });
      });
    }, // a function which produces all the messages
    post: function () {
      return new Promise((resolve, reject) => {
        db.query(postMessage, (err, results) => {
          if (err) {
            return reject(err);
          }

          resolve('Message posted!');
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      return new Promise((resolve, reject) => {
        db.query(queryAllUsers, (err, results) => {
          if (err) {
            return reject(err);
          }

          resolve(results);
        });
      });
    },
    post: function () {
      return new Promise((resolve, reject) => {
        db.query(checkUserExists, (err, results) => {
          if (err) {
            return reject(err);
          } else {
            if (results === 0) {
              db.query();
            }
          }
        });
      });
    }
  }
};
