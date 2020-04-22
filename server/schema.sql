CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TINYTEXT,
  id_users INT,
  id_rooms INT,
  timestamp DATETIME
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username TEXT(25),
  current_room INT,
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

