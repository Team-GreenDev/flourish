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
  -- id INT NOT NULL AUTO_INCREMENT,
  id varchar(255) NOT NULL,
  username varchar(50),
  name_first varchar(50),
  name_last varchar(50),
  total_like int,
  image_url varchar(255),
  bio varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE comments (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id varchar(255),
  post_id int,
  comment_text varchar(255),
  created_at datetime
);

CREATE TABLE likes (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  post_id int,
  user_id varchar(255)
);

-- CREATE TABLE media (
--   id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   type varchar(255),
--   url varchar(255)
-- );

CREATE TABLE posts (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id varchar(255),
  like_count int,
  url varchar(255),
  text varchar(255),
  created_at datetime
);

CREATE TABLE messages (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id varchar(255),
  recipient_id int,
  created_at datetime,
  text varchar(255)
);


CREATE TABLE followers (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id varchar(255),
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
insert into users set id = "1", username = 'Rachel Davis', name_first = 'Rachel', name_last = 'Davis', total_like = 5, image_url = 'https://randomuser.me/api/portraits/women/1.jpg', bio = 'I really like plants';
insert into users set id = "2", username = 'Jaime Vazquez', name_first = 'Jaime', name_last = 'Vazquez', total_like = 10, image_url = 'https://randomuser.me/api/portraits/women/2.jpg', bio = 'I really like plants';
insert into users set id = "3", username = 'Brenden Malone', name_first = 'Brenden', name_last = 'Malone', total_like = 0, image_url = 'https://randomuser.me/api/portraits/women/3.jpg', bio = 'I really like plants';
insert into users set id = "4", username = 'Lance Johns', name_first = 'Lance', name_last = 'Johns', total_like = 16, image_url = 'https://randomuser.me/api/portraits/men/4.jpg', bio = 'I really like plants';
insert into users set id = "5", username = 'Jeremy Silva', name_first = 'Jeremy', name_last = 'Silva', total_like = 9, image_url = 'https://randomuser.me/api/portraits/men/5.jpg', bio = 'I really like plants';
insert into users set id = "108191618273119179607", username = 'James Easter', name_first = 'James', name_last = 'Easter', total_like = 0, image_url = 'https://lh3.googleusercontent.com/a-/AOh14Gg16XZOeRz2vboJiotAP-YcCYaiObbtrzC6vCPQow', bio = 'Love my family, writing code, & posting about plants!';

/* add 5 posts */
INSERT INTO posts set user_id = "108191618273119179607", like_count = 3, url = 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/products/2019/9/19/3/RX_1800Flowers_Money-Plant.jpg.rend.hgtvcom.616.616.suffix/1568931656068.jpeg', text = 'Looking like an indoor lily pad jungle', created_at = NOW();
INSERT INTO posts set user_id = "4", like_count = 6, url = 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557258847-chinese-evergreen-houseplant-1557258690.jpg?crop=0.883xw:0.887xh;0.0849xw,0.0821xh&resize=480:*', text = 'Day one in the new terracotta planter', created_at = NOW();
INSERT INTO posts set user_id = "5", like_count = 1, url = 'https://bloomscape.com/wp-content/uploads/2019/03/bloomscape_peopleplants-bird-of-paradise-e1570222918824-960x1165.jpg?ver=43337', text = 'Thinking about buying bird of paradise... any advice?', created_at = NOW();
INSERT INTO posts set user_id = "108191618273119179607", like_count = 1, url = 'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png', text = 'Portrait mode on the new plant', created_at = NOW();
INSERT INTO posts set user_id = "3", like_count = 2, url = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/high-angle-view-of-potted-cactus-royalty-free-image-1568039795.jpg?crop=0.752xw:1.00xh;0.139xw,0&resize=480:*', text = 'Check out this succulent collection', created_at = NOW();
INSERT INTO posts set user_id = "108191618273119179607", like_count = 1, url = 'https://secure.img1-fg.wfcdn.com/im/69945387/resize-h600%5Ecompr-r85/8586/85860997/Fiddle+Leaf+Fig+Tree+with+Basket.jpg', text = 'My fiddle leaf fig is taking over the staircase', created_at = NOW();
INSERT INTO posts set user_id = "2", like_count = 1, url = 'https://secure.img1-fg.wfcdn.com/im/42349074/resize-h600%5Ecompr-r85/8506/85069027/Tejeda+5+Tier+Self-Watering+Wood+Vertical+Garden.jpg', text = 'Five tier wall garden is looking healthy this month', created_at = NOW();
INSERT INTO posts set user_id = "4", like_count = 1, url = 'https://secure.img1-fg.wfcdn.com/im/45353388/resize-h600%5Ecompr-r85/4797/47975478/Philodendron+Plant+in+Basket.jpg', text = 'Love this guy, adds life to this corner of our room', created_at = NOW();
INSERT INTO posts set user_id = "1", like_count = 0, url = 'https://media.architecturaldigest.com/photos/5a94846e4692126e06f34f67/master/w_1600%2Cc_limit/popular-houseplants-pilea-peperomioides.jpg', text = 'Army of five, might even go pick up some more!', created_at = NOW();