var S = require('sequelize');
var s = new S('chat', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

module.exports = s;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
