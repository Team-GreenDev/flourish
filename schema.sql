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
  id INT NOT NULL AUTO_INCREMENT,
  username varchar(50),
  name_first varchar(50),
  name_last varchar(50),
  total_like int,
  PRIMARY KEY (id)
);

CREATE TABLE comments (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int,
  post_id int,
  comment_text varchar(255),
  created_at datetime
);

CREATE TABLE likes (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  post_id int,
  user_id int
);

CREATE TABLE media (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type varchar(255),
  url varchar(255)
);

CREATE TABLE posts (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int,
  like_count int,
  media_id int,
  text varchar(255),
  created_at datetime
);

CREATE TABLE messages (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int,
  recipient_id int,
  created_at datetime,
  text varchar(255)
);


CREATE TABLE followers (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int,
  follower_id int
);

CREATE TABLE tags (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  text varchar(40)
);

CREATE TABLE post_tags (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_post int NOT NULL,
  id_tag int NOT NULL
);


/* add 5 users */
insert into users set username = 'flourishUser1', name_first = 'James', name_last = 'Easter', total_like = 5;
insert into users set username = 'flourishUser2', name_first = 'Mike', name_last = 'Bazile', total_like = 10;
insert into users set username = 'flourishUser3', name_first = 'Ed', name_last = 'Foster', total_like = 0;
insert into users set username = 'flourishUser4', name_first = 'Bames', name_last = 'Woodson', total_like = 16;
insert into users set username = 'flourishUser5', name_first = 'Harley', name_last = 'Saketson', total_like = 9;

/* add 5 posts */
INSERT INTO media set type = 'image', url = 'https://img.pokemondb.net/artwork/large/victreebel.jpg';
INSERT INTO posts set user_id = 1, like_count = 0, media_id = 1, text = 'here is a post to render', created_at = NOW();

INSERT INTO media set type = 'image', url = 'https://img.pokemondb.net/artwork/large/weepinbell.jpg';
INSERT INTO posts set user_id = 2, like_count = 3, media_id = 2, text = 'and another post', created_at = NOW();

INSERT INTO media set type = 'image', url = 'https://img.pokemondb.net/artwork/large/victreebel.jpg';
INSERT INTO posts set user_id = 3, like_count = 2, media_id = 3, text = 'check out this plant', created_at = NOW();

INSERT INTO media set type = 'image', url = 'https://img.pokemondb.net/artwork/large/oddish.jpg';
INSERT INTO posts set user_id = 4, like_count = 6, media_id = 4, text = 'another new plant i just bought', created_at = NOW();

INSERT INTO media set type = 'image', url = 'https://img.pokemondb.net/artwork/large/bulbasaur.jpg';
INSERT INTO posts set user_id = 5, like_count = 1, media_id = 5, text = 'wow, just wow. look at this plant', created_at = NOW();
