CREATE DATABASE IF NOT EXISTS `AppDB`;
use `AppDB`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `email` VARCHAR(30) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
   PRIMARY KEY ( id )
) ENGINE=INNODB;

DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT,
  `age` VARCHAR(30),
  `city` VARCHAR(30),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
) ENGINE=INNODB;