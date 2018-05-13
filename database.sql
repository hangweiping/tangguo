/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-05-13 15:48:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bonus
-- ----------------------------
DROP TABLE IF EXISTS `bonus`;
CREATE TABLE `bonus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bonus_to_send` varchar(255) DEFAULT NULL,
  `bonus_sent` varchar(255) DEFAULT NULL,
  `info` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bonus
-- ----------------------------

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `okex_uname` varchar(255) DEFAULT NULL,
  `eth_account` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '15', '22', '22', '22', '23');

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `inviter` varchar(255) DEFAULT NULL,
  `active_code` varchar(255) DEFAULT NULL,
  `is_active_email_sent` enum('0','1') DEFAULT '0',
  `is_actived` enum('0','1') DEFAULT '0' COMMENT '是否激活',
  `create_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `active_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '激活时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_table
-- ----------------------------
INSERT INTO `user_table` VALUES ('1', 'www', '111', '1', '212', '0', '0', '2018-05-13 10:57:35', '2018-05-13 10:57:35');
INSERT INTO `user_table` VALUES ('6', 'hang@1', '111111', '22', 'c61884d0-d00c-4ef8-8e5f-26a1fba01e59', '1', '0', '2018-05-13 10:57:35', '2018-05-13 10:57:35');
INSERT INTO `user_table` VALUES ('15', '136151148@qq.com', '111', '1', '928e1c66-c744-41f1-b605-44fef147b6b2', '0', '1', '2018-05-13 10:57:59', '2018-05-13 10:57:59');
