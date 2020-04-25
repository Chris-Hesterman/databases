var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages
        .get()
        .then((data) => {
          console.log(data);
          res.send(data);
        })
        .catch((err) => {
          console.log('Error: ', err);
          res.sendStatus(404);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages
        .post(req.body)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users
        .get()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.sendStatus(404);
        });
    },
    post: function (req, res) {
      console.log(req);
      models.users
        .post(req.body)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {
      models.users
        .get()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.sendStatus(404);
        });
    },
    post: function (req, res) {
      models.rooms
        .post(req.body)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  }
};
