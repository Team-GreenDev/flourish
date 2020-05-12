/**
 * Initialize this file by running:
 *   mariadb -u root < schema.sql || mariadb -u root -p < schema.sql
 */

DROP DATABASE IF EXISTS flourish;
CREATE DATABASE flourish;

USE flourish;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS post_tags;


CREATE TABLE users (
  id int PRIMARY KEY NOT NULL,
  username varchar(50),
  name_first varchar(50),
  name_last varchar(50),
  total_like int
);

CREATE TABLE comments (
  id int PRIMARY KEY NOT NULL,
  user_id int,
  post_id int,
  comment_text varchar(255),
  created_at datetime
);

CREATE TABLE likes (
  id int PRIMARY KEY NOT NULL,
  post_id int,
  user_id int
);

CREATE TABLE media (
  id int PRIMARY KEY NOT NULL,
  type varchar(255),
  url varchar(255)
);

CREATE TABLE messages (
  id int PRIMARY KEY NOT NULL,
  user_id int,
  recipient_id int,
  created_at datetime,
  text varchar(255)
);

CREATE TABLE posts (
  id int PRIMARY KEY NOT NULL,
  user_id int,
  like_count int,
  picture_id int,
  created_at datetime
);

CREATE TABLE followers (
  id int PRIMARY KEY NOT NULL,
  user_id int,
  follower_id int
);

CREATE TABLE tags (
  id int PRIMARY KEY NOT NULL,
  text varchar(40)
);

CREATE TABLE post_tags (
  id int PRIMARY KEY NOT NULL,
  id_post int NOT NULL,
  id_tag int NOT NULL
);
