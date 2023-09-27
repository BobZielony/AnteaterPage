CREATE DATABASE IF NOT EXISTS `users`
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(50),
  `password` varchar(200),
  `email` varchar(50)


) ENGINE=InnoDB DEFAULT CHARSET=utf8;
