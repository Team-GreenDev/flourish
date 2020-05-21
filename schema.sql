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
  pk int AUTO_INCREMENT,
  id varchar(255) NOT NULL,
  username varchar(50),
  name_first varchar(50),
  name_last varchar(50),
  total_like int,
  image_url varchar(255),
  bio varchar(255),
  PRIMARY KEY (pk)
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
  recipient_id varchar(255),
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


/* add 15 users */
insert into users set id = "108191618273119179607", username = 'James Easter', name_first = 'James', name_last = 'Easter', total_like = 0, image_url = 'https://lh3.googleusercontent.com/a-/AOh14Gg16XZOeRz2vboJiotAP-YcCYaiObbtrzC6vCPQow', bio = 'Love my family, writing code, & posting about plants!';
insert into users set id = "1", username = 'Rachel Davis', name_first = 'Rachel', name_last = 'Davis', total_like = 5, image_url = 'https://randomuser.me/api/portraits/women/1.jpg', bio = 'I really like plants';
insert into users set id = "2", username = 'Jaime Vazquez', name_first = 'Jaime', name_last = 'Vazquez', total_like = 10, image_url = 'https://randomuser.me/api/portraits/women/2.jpg', bio = 'I really like plants';
insert into users set id = "3", username = 'Brenden Malone', name_first = 'Brenden', name_last = 'Malone', total_like = 0, image_url = 'https://randomuser.me/api/portraits/women/3.jpg', bio = 'I really like plants';
insert into users set id = "4", username = 'Lance Johns', name_first = 'Lance', name_last = 'Johns', total_like = 16, image_url = 'https://randomuser.me/api/portraits/men/4.jpg', bio = 'I really like plants';
insert into users set id = "5", username = 'Jeremy Silva', name_first = 'Jeremy', name_last = 'Silva', total_like = 9, image_url = 'https://randomuser.me/api/portraits/men/5.jpg', bio = 'I really like plants';
insert into users set id = "6", username = 'Tyler Hall', name_first = 'Tyler', name_last = 'Hall', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/6.jpg', bio = 'I really like plants';
insert into users set id = "7", username = 'German Carter', name_first = 'German', name_last = 'Carter', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/7.jpg', bio = 'I really like plants';
insert into users set id = "8", username = 'Jeff Matthews', name_first = 'Jeff', name_last = 'Matthews', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/8.jpg', bio = 'I really like plants';
insert into users set id = "9", username = 'Ryan Westbrook', name_first = 'Ryan', name_last = 'Westbrook', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/9.jpg', bio = 'I really like plants';
insert into users set id = "10", username = 'Amy Morrics', name_first = 'Amy', name_last = 'Morrics', total_like = 5, image_url = 'https://randomuser.me/api/portraits/women/4.jpg', bio = 'I really like plants';
insert into users set id = "11", username = 'Selena Thomas', name_first = 'Selena', name_last = 'Thomas', total_like = 5, image_url = 'https://randomuser.me/api/portraits/women/5.jpg', bio = 'I really like plants';
insert into users set id = "12", username = 'Hamilton Green', name_first = 'Hamilton', name_last = 'Green', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/10.jpg', bio = 'I really like plants';
insert into users set id = "13", username = 'Mariana Ruiz', name_first = 'Mariana', name_last = 'Ruiz', total_like = 5, image_url = 'https://randomuser.me/api/portraits/women/6.jpg', bio = 'I really like plants';
insert into users set id = "14", username = 'Blake Taylor', name_first = 'Blake', name_last = 'Taylor', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/11.jpg', bio = 'I really like plants';

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

/* Message thread with user 1 */
insert into messages set user_id = '1', recipient_id = '108191618273119179607', created_at = NOW(), text = 'Hey, I really like your posts!';
insert into messages set user_id = '108191618273119179607', recipient_id = '1', created_at = NOW(), text = 'Thanks man, you too!';
insert into messages set user_id = '1', recipient_id = '108191618273119179607', created_at = NOW(), text = 'What plants do you have';
insert into messages set user_id = '108191618273119179607', recipient_id = '1', created_at = NOW(), text = 'Tons, lots of plants';
insert into messages set user_id = '1', recipient_id = '108191618273119179607', created_at = NOW(), text = 'like what uwu';
insert into messages set user_id = '108191618273119179607', recipient_id = '1', created_at = NOW(), text = 'Ferns, calatheas, and cacti mostly';
insert into messages set user_id = '1', recipient_id = '108191618273119179607', created_at = NOW(), text = 'That\'s so cool :D';
insert into messages set user_id = '108191618273119179607', recipient_id = '1', created_at = NOW(), text = 'Thanks that\s really nice of you';
insert into messages set user_id = '1', recipient_id = '108191618273119179607', created_at = NOW(), text = 'You should check out my post I made on calathea';
insert into messages set user_id = '1', recipient_id = '108191618273119179607', created_at = NOW(), text = 'I\'m really proud of it :)';
insert into messages set user_id = '108191618273119179607', recipient_id = '1', created_at = NOW(), text = 'Will do!';

/* Message thread with user 2 */
insert into messages set user_id = '2', recipient_id = '108191618273119179607', created_at = NOW(), text = 'Hey, I really like your posts!';
insert into messages set user_id = '108191618273119179607', recipient_id = '2', created_at = NOW(), text = 'Thanks man, you too!';
insert into messages set user_id = '2', recipient_id = '108191618273119179607', created_at = NOW(), text = 'That\'s so cool :D';

/* Message thread with user 3 */
insert into messages set user_id = '108191618273119179607', recipient_id = '3', created_at = NOW(), text = 'Thanks man, you too!';
insert into messages set user_id = '3', recipient_id = '108191618273119179607', created_at = NOW(), text = 'That\'s so cool :D';

/* Message thread with user 4 */
insert into messages set user_id = '108191618273119179607', recipient_id = '4', created_at = NOW(), text = 'I\'ve got a question about your latest post';

/* Message thread with user 5 */
insert into messages set user_id = '5', recipient_id = '108191618273119179607', created_at = NOW(), text = 'Hey how are you doing?!';
