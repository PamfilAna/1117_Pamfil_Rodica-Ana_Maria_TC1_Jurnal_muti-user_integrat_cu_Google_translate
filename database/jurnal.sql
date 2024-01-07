SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
CREATE DATABASE `jurnal` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `jurnal`;

CREATE TABLE IF NOT EXISTS `posts` (
  `id` smallint(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `user` smallint(10) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
posts