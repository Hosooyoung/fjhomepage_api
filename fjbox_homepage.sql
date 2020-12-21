CREATE DATABASE  IF NOT EXISTS `vue_project` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vue_project`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: vue_project
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `title` varchar(30) NOT NULL,
  `contents` text NOT NULL,
  `write_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hit` int DEFAULT NULL,
  `rewrite_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_option` varchar(45) NOT NULL,
  `file_path` text,
  PRIMARY KEY (`seq`),
  KEY `R_4` (`user_id`),
  CONSTRAINT `board_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'root','테스트','테스트','2020-11-09 10:12:36',0,'2020-11-09 10:12:36','제품',NULL),(2,'root','testetst','2323','2020-11-09 10:12:44',0,'2020-11-09 10:12:44','제품',NULL),(3,'root','dccdcd','acsac','2020-11-09 10:12:52',0,'2020-11-09 10:12:52','매뉴얼',NULL),(4,'root','zxccawqrqrg','eqtyyqyeqyqe','2020-11-09 10:13:00',11,'2020-11-24 09:36:44','매뉴얼',NULL),(5,'root','m,nm,njk','uiyiuyiu','2020-11-09 10:13:04',1,'2020-11-09 10:13:04','제품',NULL),(6,'root','[ RE ] [ RE ] tte','tqwewqewq','2020-11-10 01:10:01',5,'2020-11-24 09:43:38','제품',NULL),(7,'root','[ RE ] zz','wwewe','2020-11-10 01:10:24',4,'2020-11-10 01:10:24','매뉴얼',NULL),(8,'root','[ RE ] [ RE ] zwe','qwe','2020-11-10 06:19:57',7,'2020-11-10 06:19:57','기타',NULL),(9,'root','53131','12333','2020-11-18 09:23:53',4,'2020-11-24 09:35:01','기타',NULL),(10,'관리자','ewe','ii','2020-11-21 06:26:23',48,'2020-11-24 09:53:45','매뉴얼',NULL),(11,'관리자','tt','tt','2020-11-22 09:48:13',4,'2020-11-24 09:43:53','기타',NULL),(12,'1231','12512553','12312323','2020-12-08 07:38:03',5,'2020-12-08 07:38:22','제품',NULL),(13,'관리자','66','34','2020-12-13 06:26:32',7,'2020-12-13 06:26:32','매뉴얼','캡처2-1607840792200.PNG'),(14,'관리자','ㅌㅊ','ㅅㅅ','2020-12-13 06:34:33',8,'2020-12-13 06:34:33','기타','캡처3-1607841273514.PNG'),(15,'관리자','ㄱ두삳구삭ㄷ사ㅣㅢ가드식드시듯기드싣그싣그식ㄱㄷㅅㄷㄳ','ㅈㄷ','2020-12-15 06:30:07',19,'2020-12-15 06:30:07','매뉴얼',NULL),(16,'관리자','cc','xc','2020-12-15 07:59:47',9,'2020-12-15 07:59:47','매뉴얼','sul_jinong forever list-1608019187332.PNG'),(17,'관리자','ㅅㅅ','wqeqwrwq\nㅂㅈㄷㅂㅈㄱㅂ\nㄱㅈ\nㅂㄷ\nㅂㅈ\nㅂ\nㄱㅂㅈ\nㄱ\nㅈㄱㅂ\nㅈㄱㅂ\nㅈㄱㅂ\nㅈㅂㄱ\nㅈㅂㄱ\n\n\nㅂㅈㄷ','2020-12-16 02:53:01',6,'2020-12-16 02:53:01','제품(장비)',NULL),(18,'testjinong','qwewqewqe','xc','2020-12-17 02:04:03',3,'2020-12-17 02:04:03','제품(장비)','개발-1608170643193.txt'),(19,'관리자','qwe','we','2020-12-18 08:35:56',1,'2020-12-18 08:35:56','제품(장비)','main4-1608280556100.jpg');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_reply`
--

DROP TABLE IF EXISTS `board_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_reply` (
  `sequence` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contents` varchar(200) NOT NULL,
  `write_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `group_order` int NOT NULL,
  `orders` int NOT NULL,
  PRIMARY KEY (`sequence`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `board_reply_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_reply`
--

LOCK TABLES `board_reply` WRITE;
/*!40000 ALTER TABLE `board_reply` DISABLE KEYS */;
INSERT INTO `board_reply` VALUES (2,'관리자','wtqwtqrr','2020-11-24 09:55:47',4,1),(14,'human','21442212123434\nㅃㅉㄸ','2020-12-08 06:20:23',10,1),(15,'human','21442212123434\nㅃㅉㄸ222','2020-12-08 06:20:26',10,2),(16,'human','21442212123434ㅃㅉㄸ222qweqwg135315','2020-12-08 06:20:28',10,3),(17,'human','ㅁㄴㅁ','2020-12-08 06:21:01',10,4),(18,'human','ㅁㄴㅁ','2020-12-08 06:21:02',10,5),(19,'관리자','ㅈㅂ4231433414','2020-12-08 06:29:58',10,6),(20,'관리자','ㅕㅕㅕㅑ','2020-12-08 06:30:17',10,7),(22,'1231','21323','2020-12-08 07:21:08',10,8),(23,'1231','2323','2020-12-08 07:22:42',10,9);
/*!40000 ALTER TABLE `board_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `contents` text NOT NULL,
  `write_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hit` int NOT NULL,
  `rewrite_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(45) NOT NULL,
  `category_option` varchar(45) NOT NULL,
  `file_path` text,
  PRIMARY KEY (`seq`),
  KEY `notice_ibfk_1` (`user_id`),
  CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'공지사항 예시','공지사항 예시입니다!@!#!!#','2020-10-05 10:00:42',0,'2020-10-05 10:00:42','관리자','공지사항','C:\\fakepath\\index.js'),(2,'예시2','예시2','2020-10-26 08:17:24',1,'2020-10-26 08:17:24','관리자','공지사항',NULL),(3,'11','11','2020-10-26 08:23:17',1,'2020-10-26 08:23:17','관리자','공지사항',NULL),(4,'55','55','2020-10-27 05:08:03',1,'2020-10-27 05:08:03','관리자','공지사항',NULL),(5,'x','23','2020-10-28 10:00:54',0,'2020-10-28 10:00:54','관리자','공지사항',NULL),(6,'12313','4124','2020-10-28 10:01:17',7,'2020-10-28 10:01:17','관리자','공지사항',NULL),(7,'되나','seq시험','2020-10-29 00:14:01',0,'2020-10-29 00:14:01','관리자','공지사항',NULL),(8,'ㄱㄴㅇ','ㅈㄷㅂㄷ','2020-10-29 00:14:07',0,'2020-10-29 00:14:07','관리자','공지사항',NULL),(9,'444','5555','2020-10-29 00:14:13',0,'2020-10-29 00:14:13','관리자','공지사항',NULL),(10,'55','555','2020-10-29 00:15:47',2,'2020-10-29 00:15:47','관리자','공지사항',NULL),(11,'156','2233','2020-10-29 00:17:31',2,'2020-10-29 00:17:31','관리자','공지사항',NULL),(12,'15616','1221','2020-10-29 00:17:53',8,'2020-10-29 00:17:53','관리자','공지사항',NULL),(13,'[ 매뉴얼 ]매뉴얼을 다시받으세요','ㅈㅂㄷr','2020-11-21 06:16:41',57,'2020-11-23 07:47:06','관리자','공지사항',NULL),(14,'테스트','테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트','2020-11-23 04:39:02',1,'2020-11-23 04:39:02','관리자','업데이트',NULL),(15,'ㅎㅇ','ㅎㅇ','2020-11-23 07:47:26',0,'2020-11-23 07:47:26','관리자','공지사항',NULL),(16,'하위','ㅎㅎ','2020-11-24 07:17:29',8,'2020-11-24 07:17:29','관리자','업데이트',NULL),(17,'ㅅ','ㅅ','2020-11-24 08:25:55',1,'2020-11-24 08:25:55','관리자','업데이트',NULL),(18,'44','55','2020-12-02 01:44:44',0,'2020-12-02 01:44:44','관리자','공지사항',NULL),(19,'4','55','2020-12-02 01:50:47',0,'2020-12-02 01:50:47','관리자','공지사항',NULL),(20,'890890','00','2020-12-02 01:51:13',0,'2020-12-02 01:51:13','관리자','업데이트',NULL),(21,'4','55','2020-12-02 01:52:36',0,'2020-12-02 01:52:36','관리자','공지사항',NULL),(22,'23','5','2020-12-02 01:53:18',0,'2020-12-02 01:53:18','관리자','업데이트',NULL),(23,'4','23','2020-12-02 01:55:35',0,'2020-12-02 01:55:35','관리자','업데이트',NULL),(24,'52','35','2020-12-02 01:56:06',0,'2020-12-02 01:56:06','관리자','공지사항',NULL),(25,'123','56','2020-12-02 01:58:40',0,'2020-12-02 01:58:40','관리자','업데이트',NULL),(26,'4','44','2020-12-02 01:59:42',0,'2020-12-02 01:59:42','관리자','업데이트',NULL),(27,'23231','565','2020-12-02 02:02:45',0,'2020-12-02 02:02:45','관리자','매뉴얼',NULL),(28,'55','23','2020-12-02 02:03:58',0,'2020-12-02 02:03:58','관리자','업데이트',NULL),(29,'456','[','2020-12-02 02:15:47',0,'2020-12-02 02:15:47','관리자','매뉴얼',NULL),(30,'33345435','154354454','2020-12-02 02:17:42',0,'2020-12-02 02:17:42','관리자','업데이트',NULL),(31,'88','56','2020-12-02 02:19:42',0,'2020-12-02 02:19:42','관리자','공지사항',NULL),(32,'567','88','2020-12-02 02:20:19',0,'2020-12-02 02:20:19','관리자','매뉴얼',NULL),(33,'0','0','2020-12-02 02:22:14',0,'2020-12-02 02:22:14','관리자','공지사항',NULL),(34,'0','09','2020-12-02 02:23:56',0,'2020-12-02 02:23:56','관리자','업데이트',NULL),(35,'33','23','2020-12-02 02:28:05',0,'2020-12-02 02:28:05','관리자','업데이트',NULL),(36,'0','789','2020-12-02 02:28:36',0,'2020-12-02 02:28:36','관리자','업데이트',NULL),(37,'0','90','2020-12-02 02:29:17',0,'2020-12-02 02:29:17','관리자','업데이트',NULL),(38,'8','78','2020-12-02 02:33:43',0,'2020-12-02 02:33:43','관리자','공지사항',NULL),(39,'7','78','2020-12-02 02:35:04',0,'2020-12-02 02:35:04','관리자','매뉴얼',NULL),(40,'789','78','2020-12-02 02:36:12',0,'2020-12-02 02:36:12','관리자','업데이트',NULL),(41,'78','76','2020-12-02 02:42:57',0,'2020-12-02 02:42:57','관리자','업데이트',NULL),(42,'789ㅈㅂㅅㅈㅂㅅㅂㅈㅅ','89ㅅㅂㅈㅅㅈㅂㅅ','2020-12-02 02:45:35',29,'2020-12-08 04:31:19','관리자','매뉴얼',NULL),(43,'4','23','2020-12-02 02:46:18',0,'2020-12-02 02:46:18','관리자','공지사항',NULL),(44,'678','8','2020-12-02 02:51:34',2,'2020-12-02 02:51:34','관리자','공지사항',NULL),(45,'8','678','2020-12-02 02:53:46',4,'2020-12-02 02:53:46','관리자','공지사항',NULL),(46,'ㅈㄷ','ㅈㄷ','2020-12-10 12:09:17',0,'2020-12-10 12:09:17','관리자','공지사항',NULL),(47,'333','ㄱㄱㄱ','2020-12-10 12:09:28',1,'2020-12-10 12:09:28','관리자','업데이트',NULL),(48,'3','33','2020-12-11 01:06:00',0,'2020-12-11 01:06:00','관리자','공지사항',NULL),(49,'ㄷ','ㄷ','2020-12-11 01:07:38',0,'2020-12-11 01:07:38','관리자','공지사항',NULL),(50,'ㅈㄷ','ㅈㄷㅈㄷ','2020-12-11 01:14:51',0,'2020-12-11 01:14:51','관리자','공지사항',NULL),(51,'3333','ㄷㅈㅂㄷㅈㅂㄷㅈㅂㄷㅈㅂ','2020-12-11 01:18:15',0,'2020-12-11 01:18:15','관리자','업데이트',NULL),(52,'34343','353535353','2020-12-11 04:56:37',0,'2020-12-11 04:56:37','관리자','업데이트',NULL),(53,'678678769','444','2020-12-11 06:31:12',0,'2020-12-11 06:31:12','관리자','기타','C:/workspace/hodu/vue_project2/svr/uploads/trtr-1607668272907.txt'),(54,'123123파일테슨트','ㅈㅂㄷㅈㄷㅂㄷ','2020-12-11 06:33:29',1,'2020-12-11 06:33:29','관리자','공지사항','C:/workspace/hodu/vue_project2/svr/uploads/'),(55,'ㅋㅌㅊ','ㅈㄲㅈㄱ','2020-12-11 06:34:36',0,'2020-12-11 06:34:36','관리자','공지사항','C:/workspace/hodu/vue_project2/svr/uploads/'),(56,'ㅅㄷㅅㄷㅅㄷㅅㄷㅅ','ㅂㅈㄷ','2020-12-11 06:35:52',0,'2020-12-11 06:35:52','관리자','업데이트','C:/workspace/hodu/vue_project2/svr/uploads/ganada-1607668552016.txt'),(57,'ㅋㅌㅊ','ㅈㄷ','2020-12-11 06:36:00',0,'2020-12-11 06:36:00','관리자','기타',''),(58,'33333','쇼','2020-12-11 06:36:11',0,'2020-12-11 06:36:11','관리자','업데이트',''),(59,'ㅋㅊㅌ','ㄱ','2020-12-11 06:38:40',2,'2020-12-11 06:38:40','관리자','공지사항',NULL),(60,'8','867','2020-12-11 07:13:38',0,'2020-12-11 07:13:38','관리자','업데이트','C:/workspace/hodu/vue_project2/svr/uploads/KAUDB-1607670817950.js'),(61,'999','678','2020-12-11 07:57:17',1,'2020-12-11 07:57:17','관리자','공지사항','farmos_SQL 업데이트-1607673437373.hwp'),(62,'671231244','rr','2020-12-11 08:00:01',74,'2020-12-11 08:00:01','관리자','공지사항','sul_jinong forever list-1607673601667.PNG'),(63,'8678','33','2020-12-11 10:06:16',16,'2020-12-11 10:06:16','관리자','업데이트','KakaoTalk_20201201_131425143_01-1607681176491.jpg'),(64,'ㅎㅇㅇㅎ','ㅂㅈㄷ','2020-12-13 05:53:36',14,'2020-12-13 05:53:36','관리자','공지사항','농진청룰 마지막부분-1607838816679.txt'),(65,'마지막테스ㅡ','ㅅㅅ','2020-12-13 05:54:05',15,'2020-12-13 05:54:05','관리자','업데이트','청년소득세 감면 연령계산기-1607838845844.xlsx'),(66,'ㅈㄷ','ㅊ','2020-12-13 06:41:06',48,'2020-12-13 06:41:06','관리자','업데이트','스마트팜 용어 표준화_최종본_이명훈(농진청)-1607841665903.xlsx'),(67,'엘레먼트','ㅋㅌㅊ','2020-12-15 05:39:21',32,'2020-12-15 05:44:23','관리자','매뉴얼','농진청룰 마지막부분-1608010761401.txt');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_reply`
--

DROP TABLE IF EXISTS `notice_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_reply` (
  `sequence` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contents` varchar(200) CHARACTER SET utf8 NOT NULL,
  `write_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `group_order` int NOT NULL,
  `orders` int NOT NULL,
  PRIMARY KEY (`sequence`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notice_reply_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_reply`
--

LOCK TABLES `notice_reply` WRITE;
/*!40000 ALTER TABLE `notice_reply` DISABLE KEYS */;
INSERT INTO `notice_reply` VALUES (1,'관리자','하이','2020-11-22 09:17:26',1,1),(2,'관리자','하이ㅋㅅㅋ','2020-11-22 09:33:04',13,1),(5,'관리자','et','2020-11-23 01:50:10',17,1),(7,'관리자','ㅋㅋㄹㅋㅋㅋ','2020-11-23 04:25:10',13,2),(8,'관리자','gd','2020-11-24 07:41:14',19,1),(9,'테스트유저','ㅎㅇ','2020-11-24 08:10:57',13,3),(15,'관리자','ㅂㅈㄷ','2020-12-14 11:50:27',66,1),(16,'1231','qrwqrwq[[','2020-12-15 02:46:12',13,4),(17,'1231','cccc','2020-12-15 02:46:15',13,5),(22,'1231','ccccvvv','2020-12-15 02:46:29',13,6),(23,'1231','ccccvvv','2020-12-15 02:46:33',13,7),(25,'관리자','ㄱㄱㄱ','2020-12-15 06:07:44',13,8),(26,'관리자','ㅅㅅㅅㅅ','2020-12-15 06:07:46',13,9),(27,'관리자','ㅂㅈㄷㅂㄷㅈ','2020-12-15 06:07:48',13,10),(28,'관리자','ㄴㅇㅁㅇ ','2020-12-15 06:07:49',13,11),(29,'관리자','qwe','2020-12-16 02:31:58',67,1),(30,'관리자','qwe','2020-12-16 02:32:00',67,2),(31,'관리자','qweqewqe','2020-12-16 02:32:04',67,3);
/*!40000 ALTER TABLE `notice_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_auth` int DEFAULT NULL,
  `user_group` varchar(100) DEFAULT NULL,
  `user_device` varchar(100) NOT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1231','1231','1231','1231','$2b$10$hfG37.ZtGE1yAW0s858.ie8teDeDD4hSIHOS9om/ZqDmZ2u/yHweu',0,'1231','장비없음','2020-12-17 08:35:30','active'),('123123132','44','44','123','$2b$10$rb1cq8y4J6fceArtrc2PAOaBiF5XwFeKhY9hp2pMoLY.d/RCykofK',4,'44','44',NULL,NULL),('12345','3232','1234','1234','$2b$10$wbkO3VlD58.DX6AKwBQzsONb.EAHfmoNogE8RSWFofMR8188MPhua',0,'1234','1234',NULL,''),('15','3232','3','23','$2b$10$Gscah0lcJqSBxztW7T3wfeITP6wICVg3qaKQl/o7PB.8LDpTb.h0u',0,'2','',NULL,NULL),('2324','232','232','232','$2b$10$EVb81Xls2qVr45N6OuzRN.TilJlCgu52AxPoLOOQXAtgVAFvXa3re',3,'232','232',NULL,NULL),('44','44','44','44','$2b$10$OaMnIYbXY3yIVIQnhHWIiuTcaBOH2cbjVzAQegVep9iHsqvcmD/06',4,'44','44',NULL,NULL),('a','a','a','a','$2b$10$KzQOS4yXdVJ4.SqVOhtzeO2atv99EY5Ej0doRELOdLORIVoZs.81W',4,'a','a',NULL,NULL),('aa','aa','aa','aa','$2b$10$KC0K9.0i1cz6SogOywHGJeK7rDMrn9rdx2dliRy/dyLWDlv2F016.',0,'aa','aa','2020-12-13 07:22:27',NULL),('aaa','q','q','aaa','$2b$10$xvbs8OcyMXAmz01LJUSnF.SrT38F4EJ0lRTnjr58uJNMXsnYj3Yfe',4,'q','q',NULL,NULL),('ad','a','a','ad','$2b$10$f0Zxz2MmY9QD04SAalmqXOj5x4il4chmcx06eupLtSav4BrU5A06y',4,'a','a',NULL,NULL),('at','a','a','at','$2b$10$aAcCU29wFJv8ot0HAXmWuuXoTJpYngOPzvEB0lkwH6RNjDrfkXWgC',4,'a','a',NULL,NULL),('bcr','bcr','bcr','bcr','$2b$10$9QFO46za39Js0.Ih9PiXLur1OPTEFaYn5tmVJK3xnSLCsnyLh7D7G',2,NULL,'1','2019-12-01 06:18:12','sleep'),('cv','c','c','cv','$2b$10$UtcXIuv9yL/a9jxRE0V.Pee5qaB6kRRxAphiRf87xlH31CT5QXfPW',4,'c','c',NULL,NULL),('ewqewq','23','23','qweqe','$2b$10$OKECPlxjfogtC4h0cRRQruyPCxqh8P26A27U2Ca/s0Lw8573EzVgK',0,'23','23',NULL,NULL),('gg','gg','gg','gg','$2b$10$J/.0oB/beVzCfAniyRXxo.Y8BQHZoAyXuudmRIlgZxLc9zZLVBBEq',0,'gg','gg',NULL,NULL),('ghghghgh','gh','gh','ghghghgh','$2b$10$2DyHc0IIWp3CBak47qEfZeJEl5La4VTPMlWz1OozuvI1sDaUVVXHW',4,'g','g',NULL,'active'),('hh','hh','hh','hh','$2b$10$A.OMigpAYZEynDtkCwf/SebLQ6ijO.J5IXiylm/9hpGWGgk.HRcDC',0,'hh','hh',NULL,NULL),('human','123','123','비번123','$2b$10$l7jLXed2nLbzell0GhPlR.JOmfwqlRSFiwXseOkLbUKAnCIj/trZ2',0,'123','123','2020-12-15 07:34:39','sleep'),('qweb','qwe','qwe','qwe','$2b$10$WNT7SjjxmDdeOhoEvwwy0OguVtYIIEI9CGeQjqVlurtWIC7T9yR6.',4,'qwe','qwe',NULL,NULL),('root','01046514813','ghtndud1993@naver.com','호수영','admin',0,NULL,'4',NULL,'active'),('testjinong','12312','213123','조윤성','$2b$10$P5SiR32ahFsG/9q8olw3ne04XVcxxlJclO00j3L9LGVrOhNgBfi5y',0,'23323','장비없음','2020-12-17 02:05:48',NULL),('tt','tt','tt','tt','$2b$10$T5/QaMAlpykUH5hDxMhL6OkyI5/8CmreP66KAukCqL09Y1Ww4rxxS',4,'tt','tt',NULL,NULL),('wqwqe1','2323','2323','2323','$2b$10$mahk1xBiqTTZmg3jOcl.0ehlxlvHA5tCNn8gglJaeBPQW7K47wiDe',0,NULL,'5',NULL,'dead'),('관리자','0313601970','sooyoung.jinong@gmail.com','관리자','$2b$10$1vVTIPF57FVUfX.YsFz/wuKyLt0cqlSSevD3vPvmJBKgcpgA5RITC',1,NULL,'6','2020-12-18 08:35:34','active'),('지농지농','ㅈㅈ','ㅈㅈ','지농','$2b$10$tO0Hcr1CSmadSnpEGhuu4.TT0riyscVIiey91JgyISkyP0ERAQfci',0,'ㅈㅈ','장비없음','2020-12-16 07:53:53',NULL),('테스트유저','123','123','test','$2b$10$eW6d2zurUhjktOmjcnY7xu55adoZvBHMC3sSdUaffiqmyfYUKn2pG',0,NULL,'7',NULL,'req'),('ㅍㅍ','ㅍㅍ','vv','ㅍㅍ','$2b$10$QdHjT4kwm38L99H7/QkeIe3aPyp0FEPdqRPkl70tGCoxqSTIDBsAO',4,'vv','vv',NULL,NULL),('호수영','0101010','w@w.com','호수영','$2b$10$0TUKx6cZsGlErQGcWFyMou9fs7UIuJXLggvT8xJqICUMHyGa6ZAPO',0,NULL,'8','2020-12-01 01:08:26','req');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-21 10:31:54
