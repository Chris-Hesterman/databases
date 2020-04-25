DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INT AUTO_INCREMENT,
  message TINYTEXT NOT NULL,
  users_id_user INT NOT NULL,
  rooms_id_room INT NOT NULL,
  `timestamp` DATETIME NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  rooms_id_currentRoom INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT,
  roomname VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE friends (
  id INT AUTO_INCREMENT,
  users_id_user INT NOT NULL,
  users_id_friend INT NOT NULL,
  PRIMARY KEY (id)
);
/* Create other tables and define schemas for them here! */
ALTER TABLE users ADD FOREIGN KEY(rooms_id_currentRoom) REFERENCES rooms (id);
ALTER TABLE messages ADD FOREIGN KEY(users_id_user) REFERENCES users (id);
ALTER TABLE messages ADD FOREIGN KEY(rooms_id_room) REFERENCES rooms (id);
ALTER TABLE friends ADD FOREIGN KEY(users_id_user) REFERENCES users (id);
ALTER TABLE friends ADD FOREIGN KEY(users_id_friend) REFERENCES users (id);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

