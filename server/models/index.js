var db = require('../db');

var queryAllMessages = `SELECT messages.message, rooms.roomname, users.username
  FROM messages, rooms, users
  WHERE messages.rooms_id_room = rooms.id
  AND messages.users_id_user = users.id
  ORDER BY messages.timestamp DESC`;

var postMessage = `INSERT INTO messages (id, message, users_id_user, rooms_id_room, timestamp)
  VALUES (null, ?, (SELECT id FROM users WHERE username = ?), (SELECT id FROM rooms WHERE roomname = ?), NOW())`;

var queryAllUsers = `SELECT users.username, rooms.roomname FROM users, rooms
  WHERE users.rooms_id_currentRoom = rooms.id`;

var checkUserExists = `SELECT CASE WHEN EXISTS (SELECT username FROM users WHERE username = ?)
  THEN 1
  ELSE 0
  END`;

var checkRoomExists = `SELECT CASE WHEN EXISTS (SELECT roomname FROM rooms WHERE roomname = ?)
  THEN 1
  ELSE 0
  END`;

var postUser = `INSERT INTO users (id, username, rooms_id_currentRoom) VALUES (null, ?, (SELECT id FROM rooms WHERE roomname = 'main'))`;

var postRoom = `INSERT INTO rooms (id, roomname) VALUES (null, ?)`;

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
    post: function (postData) {
      var parameters = [postData.message, postData.username, postData.roomname];
      return new Promise((resolve, reject) => {
        db.query(postMessage, parameters, (err, results) => {
          if (err) {
            return reject(err);
          }

          resolve(results);
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
    post: function (usernameData) {
      var parameters = [usernameData.username];
      return new Promise((resolve, reject) => {
        db.query(checkUserExists, parameters, (err, results, fields) => {
          var boolean;
          for (var key in results[0]) {
            boolean = results[0][key];
          }
          if (err) {
            return reject(err);
          } else {
            if (!boolean) {
              db.query(postUser, parameters, (err, results) => {
                if (err) {
                  return reject(err);
                }
                resolve('User added');
              });
            } else {
              resolve('User already exists');
            }
          }
        });
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function () {
      return new Promise((resolve, reject) => {
        db.query(queryMessagesInRoom, (err, results) => {
          if (err) {
            return reject(err);
          }

          resolve(results);
        });
      });
    },
    post: function (roomnameData) {
      var parameters = [roomnameData.roomname];
      return new Promise((resolve, reject) => {
        db.query(checkRoomExists, parameters, (err, results, fields) => {
          var boolean;
          for (var key in results[0]) {
            boolean = results[0][key];
          }
          if (err) {
            return reject(err);
          } else {
            if (!boolean) {
              db.query(postRoom, parameters, (err, results) => {
                if (err) {
                  return reject(err);
                }
                resolve('Room added');
              });
            } else {
              resolve('Room already exists');
            }
          }
        });
      });
    }
  }
};
