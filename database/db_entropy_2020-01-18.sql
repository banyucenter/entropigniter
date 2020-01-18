# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.01 (MySQL 5.5.5-10.1.37-MariaDB)
# Database: db_entropy
# Generation Time: 2020-01-18 10:35:52 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table data_huffman
# ------------------------------------------------------------

DROP VIEW IF EXISTS `data_huffman`;

CREATE TABLE `data_huffman` (
   `id` INT(11) NOT NULL DEFAULT '0',
   `total_character` INT(11) NULL DEFAULT NULL,
   `inputan` VARCHAR(300) NULL DEFAULT NULL,
   `simbol` VARCHAR(100) NULL DEFAULT NULL,
   `kemunculan` INT(11) NULL DEFAULT NULL,
   `codeword` VARCHAR(100) NULL DEFAULT NULL,
   `jumlah_code` INT(11) NULL DEFAULT NULL,
   `average` BIGINT(21) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Dump of table datastring
# ------------------------------------------------------------

DROP TABLE IF EXISTS `datastring`;

CREATE TABLE `datastring` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inputan` varchar(300) DEFAULT NULL,
  `total_character` int(11) DEFAULT NULL,
  `sudah_hitung` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

LOCK TABLES `datastring` WRITE;
/*!40000 ALTER TABLE `datastring` DISABLE KEYS */;

INSERT INTO `datastring` (`id`, `inputan`, `total_character`, `sudah_hitung`)
VALUES
	(40,'ANWARSUSANTO',12,1);

/*!40000 ALTER TABLE `datastring` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table huffman
# ------------------------------------------------------------

DROP TABLE IF EXISTS `huffman`;

CREATE TABLE `huffman` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_data` int(11) DEFAULT NULL,
  `simbol` varchar(100) DEFAULT NULL,
  `codeword` varchar(100) DEFAULT NULL,
  `jumlah_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_data` (`id_data`),
  CONSTRAINT `huffman_ibfk_1` FOREIGN KEY (`id_data`) REFERENCES `datastring` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=379 DEFAULT CHARSET=latin1;



# Dump of table kalkulasi_entropy
# ------------------------------------------------------------

DROP VIEW IF EXISTS `kalkulasi_entropy`;

CREATE TABLE `kalkulasi_entropy` (
   `id_data` INT(11) NULL DEFAULT NULL,
   `jumlah_simbol` BIGINT(21) NOT NULL DEFAULT '0',
   `jumlah` DECIMAL(32) NULL DEFAULT NULL,
   `probabilitas` DECIMAL(33) NULL DEFAULT NULL,
   `entropy` DOUBLE NULL DEFAULT NULL,
   `jumlah_bit` DOUBLE NULL DEFAULT NULL
) ENGINE=MyISAM;



# Dump of table kalkulasi_huffman
# ------------------------------------------------------------

DROP VIEW IF EXISTS `kalkulasi_huffman`;

CREATE TABLE `kalkulasi_huffman` (
   `id` INT(11) NOT NULL DEFAULT '0',
   `sumaverage` DECIMAL(42) NULL DEFAULT NULL,
   `sumkemunculan` DECIMAL(32) NULL DEFAULT NULL,
   `Lavg` DECIMAL(46) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Dump of table split
# ------------------------------------------------------------

DROP TABLE IF EXISTS `split`;

CREATE TABLE `split` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_data` int(11) DEFAULT NULL,
  `simbol` varchar(10) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_data` (`id_data`),
  CONSTRAINT `split_ibfk_1` FOREIGN KEY (`id_data`) REFERENCES `datastring` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=265 DEFAULT CHARSET=latin1;

LOCK TABLES `split` WRITE;
/*!40000 ALTER TABLE `split` DISABLE KEYS */;

INSERT INTO `split` (`id`, `id_data`, `simbol`, `jumlah`)
VALUES
	(257,40,'A',3),
	(258,40,'N',2),
	(259,40,'O',1),
	(260,40,'R',1),
	(261,40,'S',2),
	(262,40,'T',1),
	(263,40,'U',1),
	(264,40,'W',1);

/*!40000 ALTER TABLE `split` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table v_entropy
# ------------------------------------------------------------

DROP VIEW IF EXISTS `v_entropy`;

CREATE TABLE `v_entropy` (
   `id` INT(11) NOT NULL DEFAULT '0',
   `inputan` VARCHAR(300) NULL DEFAULT NULL,
   `total_character` INT(11) NULL DEFAULT NULL,
   `sudah_hitung` INT(11) NULL DEFAULT NULL,
   `id_data` INT(11) NULL DEFAULT NULL,
   `simbol` VARCHAR(10) NULL DEFAULT NULL,
   `jumlah` INT(11) NULL DEFAULT NULL,
   `probabilitas` DECIMAL(14) NULL DEFAULT NULL,
   `self_information` DOUBLE NULL DEFAULT NULL,
   `nilaientropi` DOUBLE NULL DEFAULT NULL
) ENGINE=MyISAM;



# Dump of table v_frek
# ------------------------------------------------------------

DROP VIEW IF EXISTS `v_frek`;

CREATE TABLE `v_frek` (
   `id_data` INT(11) NULL DEFAULT NULL,
   `simbol` VARCHAR(10) NULL DEFAULT NULL,
   `jumlah` INT(11) NULL DEFAULT NULL,
   `probabilitas` DECIMAL(14) NULL DEFAULT NULL,
   `self_information` DOUBLE NULL DEFAULT NULL,
   `nilaientropi` DOUBLE NULL DEFAULT NULL
) ENGINE=MyISAM;



# Dump of table v_huffman
# ------------------------------------------------------------

DROP VIEW IF EXISTS `v_huffman`;

CREATE TABLE `v_huffman` (
   `id` INT(11) NOT NULL DEFAULT '0',
   `simbol` VARCHAR(100) NULL DEFAULT NULL,
   `id_data` INT(11) NULL DEFAULT NULL,
   `codeword` VARCHAR(100) NULL DEFAULT NULL,
   `jumlah_code` INT(11) NULL DEFAULT NULL,
   `kemunculan` INT(11) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Dump of table v_split
# ------------------------------------------------------------

DROP VIEW IF EXISTS `v_split`;

CREATE TABLE `v_split` (
   `id` INT(11) NOT NULL DEFAULT '0',
   `id_data` INT(11) NULL DEFAULT NULL,
   `simbol` VARCHAR(10) NULL DEFAULT NULL,
   `jumlah` INT(11) NULL DEFAULT NULL
) ENGINE=MyISAM;





# Replace placeholder table for v_frek with correct view syntax
# ------------------------------------------------------------

DROP TABLE `v_frek`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_frek`
AS SELECT
   `split`.`id_data` AS `id_data`,
   `split`.`simbol` AS `simbol`,
   `split`.`jumlah` AS `jumlah`,(`split`.`jumlah` / `datastring`.`total_character`) AS `probabilitas`,log2((1 / (`split`.`jumlah` / `datastring`.`total_character`))) AS `self_information`,((`split`.`jumlah` / `datastring`.`total_character`) * log2((1 / (`split`.`jumlah` / `datastring`.`total_character`)))) AS `nilaientropi`
FROM (`split` join `datastring`) where (`split`.`id_data` = `datastring`.`id`);


# Replace placeholder table for data_huffman with correct view syntax
# ------------------------------------------------------------

DROP TABLE `data_huffman`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `data_huffman`
AS SELECT
   `datastring`.`id` AS `id`,
   `datastring`.`total_character` AS `total_character`,
   `datastring`.`inputan` AS `inputan`,
   `v_huffman`.`simbol` AS `simbol`,
   `v_huffman`.`kemunculan` AS `kemunculan`,
   `v_huffman`.`codeword` AS `codeword`,
   `v_huffman`.`jumlah_code` AS `jumlah_code`,(`v_huffman`.`kemunculan` * `v_huffman`.`jumlah_code`) AS `average`
FROM (`datastring` join `v_huffman` on((`v_huffman`.`id_data` = `datastring`.`id`)));


# Replace placeholder table for v_split with correct view syntax
# ------------------------------------------------------------

DROP TABLE `v_split`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_split`
AS SELECT
   `split`.`id` AS `id`,
   `split`.`id_data` AS `id_data`,
   `split`.`simbol` AS `simbol`,
   `split`.`jumlah` AS `jumlah`
FROM `split`;


# Replace placeholder table for v_huffman with correct view syntax
# ------------------------------------------------------------

DROP TABLE `v_huffman`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_huffman`
AS SELECT
   `huffman`.`id` AS `id`,
   `huffman`.`simbol` AS `simbol`,
   `huffman`.`id_data` AS `id_data`,
   `huffman`.`codeword` AS `codeword`,
   `huffman`.`jumlah_code` AS `jumlah_code`,
   `split`.`jumlah` AS `kemunculan`
FROM (`huffman` join `split` on(((`huffman`.`simbol` = `split`.`simbol`) and (`huffman`.`id_data` = `split`.`id_data`))));


# Replace placeholder table for v_entropy with correct view syntax
# ------------------------------------------------------------

DROP TABLE `v_entropy`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_entropy`
AS SELECT
   `datastring`.`id` AS `id`,
   `datastring`.`inputan` AS `inputan`,
   `datastring`.`total_character` AS `total_character`,
   `datastring`.`sudah_hitung` AS `sudah_hitung`,
   `v_frek`.`id_data` AS `id_data`,
   `v_frek`.`simbol` AS `simbol`,
   `v_frek`.`jumlah` AS `jumlah`,
   `v_frek`.`probabilitas` AS `probabilitas`,
   `v_frek`.`self_information` AS `self_information`,
   `v_frek`.`nilaientropi` AS `nilaientropi`
FROM (`datastring` join `v_frek` on((`v_frek`.`id_data` = `datastring`.`id`)));


# Replace placeholder table for kalkulasi_entropy with correct view syntax
# ------------------------------------------------------------

DROP TABLE `kalkulasi_entropy`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `kalkulasi_entropy`
AS SELECT
   `v_entropy`.`id_data` AS `id_data`,count(`v_entropy`.`simbol`) AS `jumlah_simbol`,sum(`v_entropy`.`jumlah`) AS `jumlah`,round(sum(`v_entropy`.`probabilitas`),0) AS `probabilitas`,sum(`v_entropy`.`nilaientropi`) AS `entropy`,(sum(`v_entropy`.`nilaientropi`) * sum(`v_entropy`.`jumlah`)) AS `jumlah_bit`
FROM `v_entropy` group by `v_entropy`.`id_data`;


# Replace placeholder table for kalkulasi_huffman with correct view syntax
# ------------------------------------------------------------

DROP TABLE `kalkulasi_huffman`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `kalkulasi_huffman`
AS SELECT
   `data_huffman`.`id` AS `id`,sum(`data_huffman`.`average`) AS `sumaverage`,sum(`data_huffman`.`kemunculan`) AS `sumkemunculan`,(sum(`data_huffman`.`average`) / sum(`data_huffman`.`kemunculan`)) AS `Lavg`
FROM `data_huffman` group by `data_huffman`.`id`;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
