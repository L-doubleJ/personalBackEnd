/*
Navicat MySQL Data Transfer

Source Server         : LJJ
Source Server Version : 80018
Source Host           : localhost:3306
Source Database       : personal

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2020-01-01 14:05:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for expenses
-- ----------------------------
DROP TABLE IF EXISTS `expenses`;
CREATE TABLE `expenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '1 收入 2 支出',
  `date` int(11) NOT NULL,
  `userid` int(11) NOT NULL COMMENT '对应的users表的id',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '备注',
  `money` decimal(10,2) NOT NULL,
  `title` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of expenses
-- ----------------------------
INSERT INTO `expenses` VALUES ('5', '1', '1575907200', '28', '收保护费，谁敢哔哔赖赖', '123.00', '杰哥保护费');
INSERT INTO `expenses` VALUES ('6', '2', '1575216000', '28', '123', '12.00', '买衣服');

-- ----------------------------
-- Table structure for relation
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relation` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `realname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of relation
-- ----------------------------
INSERT INTO `relation` VALUES ('1', '28', '儿子', '父子', '13812345678', '哈哈1', '李灏');
INSERT INTO `relation` VALUES ('4', '28', '哈哈', '干活', '139', '133', '123');

-- ----------------------------
-- Table structure for remeber
-- ----------------------------
DROP TABLE IF EXISTS `remeber`;
CREATE TABLE `remeber` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` int(11) NOT NULL,
  `remark` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `userid` int(11) NOT NULL,
  `state` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of remeber
-- ----------------------------
INSERT INTO `remeber` VALUES ('3', '123', '1231231231', '按时', '28', '2');
INSERT INTO `remeber` VALUES ('4', '1231231', '1234123123', '奥德赛', '28', '3');
INSERT INTO `remeber` VALUES ('8', '123123', '1577247153', '12312', '28', '2');
INSERT INTO `remeber` VALUES ('9', '答题啦今晚', '1577836800', '答题ila', '28', '2');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账号',
  `realname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '昵称',
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '邮箱',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `hobbies` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '兴趣爱好',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('28', 'ljj', '哈哈', '123', '792972988@.com', '1u5jvfskambk0', '吃喝玩');
INSERT INTO `users` VALUES ('29', '杰哥', '', '123', '', 'ybokq2a4zzk0', '');
