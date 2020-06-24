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

CREATE TABLE posts (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id varchar(255),
  like_count int,
  url varchar(255),
  text varchar(255),
  tag varchar(60),
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
  follower_id varchar(255)
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
insert into users set id = "108191618273119179607", username = 'James Easter', name_first = 'James', name_last = 'Easter', total_like = 7, image_url = 'https://lh3.googleusercontent.com/a-/AOh14Gg16XZOeRz2vboJiotAP-YcCYaiObbtrzC6vCPQow', bio = 'Love my family, writing code, & posting about plants!';
insert into users set id = "1", username = 'Rachel Davis', name_first = 'Rachel', name_last = 'Davis', total_like = 5, image_url = 'https://randomuser.me/api/portraits/women/1.jpg', bio = 'Proud fiddle leaf fig owner';
insert into users set id = "2", username = 'Jamie Chiang', name_first = 'Jamie', name_last = 'Chiang', total_like = 10, image_url = 'https://randomuser.me/api/portraits/women/2.jpg', bio = 'Enjoy learing and collecting indor plants';
insert into users set id = "3", username = 'Brenden Malone', name_first = 'Brenden', name_last = 'Malone', total_like = 0, image_url = 'https://randomuser.me/api/portraits/women/3.jpg', bio = 'Wanna be green thumb expert';
insert into users set id = "4", username = 'Lance Johns', name_first = 'Lance', name_last = 'Johns', total_like = 16, image_url = 'https://randomuser.me/api/portraits/men/4.jpg', bio = 'Aspiring plant owner, football enthusiast';
insert into users set id = "5", username = 'Jeremy Silva', name_first = 'Jeremy', name_last = 'Silva', total_like = 9, image_url = 'https://randomuser.me/api/portraits/men/5.jpg', bio = 'My essentials: coffee, running, houseplants';
insert into users set id = "6", username = 'Tyler Hall', name_first = 'Tyler', name_last = 'Hall', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/6.jpg', bio = 'Music & plants give life';
insert into users set id = "7", username = 'German Carter', name_first = 'German', name_last = 'Carter', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/7.jpg', bio = 'Traveler, blogger, flourish-er';
insert into users set id = "8", username = 'Jeff Matthews', name_first = 'Jeff', name_last = 'Matthews', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/8.jpg', bio = 'Biologist, gardener, friend';
insert into users set id = "9", username = 'Ryan Westbrook', name_first = 'Ryan', name_last = 'Westbrook', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/9.jpg', bio = 'I love talking politics & plants';
insert into users set id = "10", username = 'Amy Morris', name_first = 'Amy', name_last = 'Morris', total_like = 5, image_url = 'https://randomuser.me/api/portraits/women/4.jpg', bio = 'Always reading, always growing';
insert into users set id = "11", username = 'Selena Thomas', name_first = 'Selena', name_last = 'Thomas', total_like = 5, image_url = 'https://randomuser.me/api/portraits/women/5.jpg', bio = 'Love my dog, my family, & my plants';
insert into users set id = "12", username = 'Hamilton Green', name_first = 'Hamilton', name_last = 'Green', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/10.jpg', bio = 'Teacher, author, gardener';
insert into users set id = "13", username = 'Mariana Ruiz', name_first = 'Mariana', name_last = 'Ruiz', total_like = 5, image_url = 'https://randomuser.me/api/portraits/women/6.jpg', bio = 'Love dance, friends, food';
insert into users set id = "14", username = 'Blake Taylor', name_first = 'Blake', name_last = 'Taylor', total_like = 5, image_url = 'https://randomuser.me/api/portraits/men/11.jpg', bio = 'Looking to learn more!';
insert into users set id = "15", username = 'Mike Mil\'k', name_first = 'Mike', name_last = 'Bazile', total_like = 7, image_url = 'https://randomuser.me/api/portraits/men/16.jpg', bio = 'Michael Jordan and indoor plants are my jam';

/* add 5 posts */
INSERT INTO posts set user_id = "5", like_count = 3, url = 'http://www.costafarms.com/images/SlideShow/Croton-Colorful-Houseplants-Costa-Farms.jpg', text = 'Soaking up the monring sunshine', created_at = NOW(), tag = '#indoorlife';
INSERT INTO posts set user_id = "108191618273119179607", like_count = 3, url = 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/products/2019/9/19/3/RX_1800Flowers_Money-Plant.jpg.rend.hgtvcom.616.616.suffix/1568931656068.jpeg', text = 'Looking like an indoor lily pad jungle', created_at = NOW(), tag = '#indoorlife';
INSERT INTO posts set user_id = "1", like_count = 6, url = 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557258847-chinese-evergreen-houseplant-1557258690.jpg?crop=0.883xw:0.887xh;0.0849xw,0.0821xh&resize=480:*', text = 'Day one in the new terracotta planter', created_at = NOW(), tag = '#firstplant';
INSERT INTO posts set user_id = "3", like_count = 7, url = 'https://i.pinimg.com/originals/35/77/68/3577688200928edcde03de3b5f2b4c9f.jpg', text = 'I\'ve only had this tree for one week, look at how much it\'s grown!', created_at = NOW(), tag = '#kingfiddleleaf';
INSERT INTO posts set user_id = "5", like_count = 5, url = 'https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=1410176-847&recipeName=680', text = 'My new additions to my front yard!', created_at = NOW(), tag = '#lilfiddle';
INSERT INTO posts set user_id = "108191618273119179607", like_count = 4, url = 'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png', text = 'Portrait mode on the new plant', created_at = NOW(), tag = '#portraitmode';
INSERT INTO posts set user_id = "5", like_count = 1, url = 'https://bloomscape.com/wp-content/uploads/2019/03/bloomscape_peopleplants-bird-of-paradise-e1570222918824-960x1165.jpg?ver=43337', text = 'Thinking about buying bird of paradise... any advice?', created_at = NOW(), tag = '#SilvaThePlantGoat';
INSERT INTO posts set user_id = "1", like_count = 1, url = 'https://secure.img1-fg.wfcdn.com/im/69945387/resize-h600%5Ecompr-r85/8586/85860997/Fiddle+Leaf+Fig+Tree+with+Basket.jpg', text = 'My fiddle leaf fig is taking over the staircase', created_at = NOW(), tag = '#fiddlefiglife';
INSERT INTO posts set user_id = "3", like_count = 2, url = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/high-angle-view-of-potted-cactus-royalty-free-image-1568039795.jpg?crop=0.752xw:1.00xh;0.139xw,0&resize=480:*', text = 'Check out this succulent collection', created_at = NOW(), tag = '#myfavplants';
INSERT INTO posts set user_id = "2", like_count = 1, url = 'https://secure.img1-fg.wfcdn.com/im/42349074/resize-h600%5Ecompr-r85/8506/85069027/Tejeda+5+Tier+Self-Watering+Wood+Vertical+Garden.jpg', text = 'Five tier wall garden is looking healthy this month', created_at = NOW(), tag = '#lookinghealthy';
INSERT INTO posts set user_id = "4", like_count = 1, url = 'https://secure.img1-fg.wfcdn.com/im/45353388/resize-h600%5Ecompr-r85/4797/47975478/Philodendron+Plant+in+Basket.jpg', text = 'Love this guy, adds life to this corner of our room', created_at = NOW(), tag = '#growingstrong';
INSERT INTO posts set user_id = "1", like_count = 12, url = 'https://media.architecturaldigest.com/photos/5a94846e4692126e06f34f67/master/w_1600%2Cc_limit/popular-houseplants-pilea-peperomioides.jpg', text = 'Army of five, might even go pick up some more!', created_at = NOW(), tag = '#thegreenteam';
INSERT INTO posts set user_id = "5", like_count = 7, url = 'https://ksassets.timeincuk.net/wp/uploads/sites/56/2019/02/Best-house-plants-unkillable-patch-plants-920x920.jpg', text = 'These two guys are very low maintenance!', created_at = NOW(), tag = '#easypeasy';

/* Message thread with user 12 */
insert into messages set user_id = '12', recipient_id = '108191618273119179607', created_at = '2020-05-20 12-00-12', text = 'Hey, I really like your posts!';
insert into messages set user_id = '108191618273119179607', recipient_id = '12', created_at = '2020-05-20 12-00-12', text = 'Thanks so much';
insert into messages set user_id = '12', recipient_id = '108191618273119179607', created_at = '2020-05-20 12-00-12', text = 'What plants do you have';
insert into messages set user_id = '108191618273119179607', recipient_id = '12', created_at = '2020-05-20 12-00-12', text = 'Tons, lots of plants';
insert into messages set user_id = '12', recipient_id = '108191618273119179607', created_at = '2020-05-20 12-00-12', text = 'like what?';
insert into messages set user_id = '108191618273119179607', recipient_id = '12', created_at = '2020-05-20 12-00-12', text = 'Ferns mostly';
insert into messages set user_id = '12', recipient_id = '108191618273119179607', created_at = '2020-05-20 12-00-12', text = 'That\'s so cool :D';
insert into messages set user_id = '108191618273119179607', recipient_id = '12', created_at = '2020-05-20 12-00-12', text = 'Thanks that\s really nice of you';
insert into messages set user_id = '12', recipient_id = '108191618273119179607', created_at = '2020-05-20 12-00-12', text = 'You should check out my post I made on my fiddle leaf fig';
insert into messages set user_id = '12', recipient_id = '108191618273119179607', created_at = '2020-05-20 12-00-12', text = 'I\'m really proud of it :)';
insert into messages set user_id = '108191618273119179607', recipient_id = '12', created_at = '2020-05-20 12-00-12', text = 'Will do!';

/* Message thread with user 2 */
insert into messages set user_id = '2', recipient_id = '108191618273119179607', created_at = '2020-05-21 12-00-12', text = 'Hey, I really like your posts!';
insert into messages set user_id = '108191618273119179607', recipient_id = '2', created_at = '2020-05-21 12-00-12', text = 'Thanks, you too!';

/* Message thread with user 3 */
insert into messages set user_id = '108191618273119179607', recipient_id = '3', created_at = '2020-05-22 12-00-12', text = 'Who should I check out?';
insert into messages set user_id = '3', recipient_id = '108191618273119179607', created_at = '2020-05-22 12-00-12', text = 'You should follow Jeremy, he knows a lot about house plants';

/* Message thread with user 11 */
insert into messages set user_id = '108191618273119179607', recipient_id = '11', created_at = NOW(), text = 'Just bought that new fiddle leaf you told me about!';

/* Message thread with user 10 */


/* Message thread with user 13 */
insert into messages set user_id = '13', recipient_id = '108191618273119179607', created_at = '2020-05-26 12-00-12', text = 'That\'s so cool :D';

/* Message thread with user 8 */
insert into messages set user_id = '108191618273119179607', recipient_id = '8', created_at = NOW(), text = 'I\'ve got a question about your latest post';

/* Message thread with user 14 */
insert into messages set user_id = '14', recipient_id = '108191618273119179607', created_at = '2020-05-26 12-00-12', text = 'Glad you joined Flourish!';

/* Message thread with user 6 */
insert into messages set user_id = '6', recipient_id = '108191618273119179607', created_at = '2020-05-26 12-00-12', text = 'Have you tried out the plant identification feature yet?';

/* Message thread with user 15 */
insert into messages set user_id = '15', recipient_id = '108191618273119179607', created_at = '2020-05-28 12-00-12', text = 'The augmented reality is so cool!';

/* Add 5 followers */
insert into followers set user_id = '108191618273119179607', follower_id = '2';
insert into followers set user_id = '108191618273119179607', follower_id = '3';
insert into followers set user_id = '108191618273119179607', follower_id = '4';
insert into followers set user_id = '108191618273119179607', follower_id = '5';
insert into followers set user_id = '108191618273119179607', follower_id = '6';
-- add followers for rachel
insert into followers set user_id = '1', follower_id = '2';
insert into followers set user_id = '1', follower_id = '3';
insert into followers set user_id = '1', follower_id = '4';
insert into followers set user_id = '1', follower_id = '5';
insert into followers set user_id = '1', follower_id = '6';
insert into followers set user_id = '1', follower_id = '7';
insert into followers set user_id = '1', follower_id = '8';
insert into followers set user_id = '1', follower_id = '9';
insert into followers set user_id = '1', follower_id = '10';
insert into followers set user_id = '1', follower_id = '11';


/* Add 5 users to follow back */
insert into followers set user_id = '3', follower_id = '108191618273119179607';
insert into followers set user_id = '4', follower_id = '108191618273119179607';
insert into followers set user_id = '6', follower_id = '108191618273119179607';
insert into followers set user_id = '2', follower_id = '108191618273119179607';
-- add people rachel is following
insert into followers set user_id = '2', follower_id = '1';
insert into followers set user_id = '3', follower_id = '1';
insert into followers set user_id = '4', follower_id = '1';
insert into followers set user_id = '5', follower_id = '1';
insert into followers set user_id = '6', follower_id = '1';
insert into followers set user_id = '7', follower_id = '1';
insert into followers set user_id = '8', follower_id = '1';
insert into followers set user_id = '9', follower_id = '1';
insert into followers set user_id = '10', follower_id = '1';
insert into followers set user_id = '11', follower_id = '1';

/* Add new comments to posts */
insert into comments set user_id = '4', post_id = 11, comment_text = 'Sweet post!', created_at = NOW();
insert into comments set user_id = '2', post_id = 12, comment_text = 'Those look great! I love the arrangement', created_at = NOW();
insert into comments set user_id = '3', post_id = 12, comment_text = 'Love the colors', created_at = NOW();
insert into comments set user_id = '4', post_id = 12, comment_text = 'I need some of those plants', created_at = NOW();
insert into comments set user_id = '5', post_id = 12, comment_text = 'You do have an army!', created_at = NOW();
insert into comments set user_id = '4', post_id = 11, comment_text = 'Sweet post!', created_at = NOW();
insert into comments set user_id = '2', post_id = 10, comment_text = 'Those look great! I love the arrangement', created_at = NOW();
insert into comments set user_id = '3', post_id = 8, comment_text = 'Love the colors', created_at = NOW();
insert into comments set user_id = '4', post_id = 8, comment_text = 'I need some of those plants', created_at = NOW();
insert into comments set user_id = '4', post_id = 6, comment_text = 'Sweet post!', created_at = NOW();
insert into comments set user_id = '2', post_id = 6, comment_text = 'Those look great! I love the arrangement', created_at = NOW();
insert into comments set user_id = '3', post_id = 6, comment_text = 'Love the colors', created_at = NOW();
insert into comments set user_id = '4', post_id = 5, comment_text = 'I need some of those plants', created_at = NOW();
insert into comments set user_id = '2', post_id = 13, comment_text = 'Love the leaves', created_at = NOW();
insert into comments set user_id = '1', post_id = 13, comment_text = 'I need one of those plants', created_at = NOW();

-- Add a like to a post
-- Liked Lance's post
insert into likes set post_id = 11, user_id = '108191618273119179607';
UPDATE posts set like_count = like_count + 1 WHERE id = 11;
update users set total_like = total_like + 1 where id = '4';
-- Liked Jamie's post
insert into likes set post_id = 10, user_id = '108191618273119179607';
UPDATE posts set like_count = like_count + 1 WHERE id = 10;
update users set total_like = total_like + 1 where id = '2';
-- Liked Brenden's post
insert into likes set post_id = 4, user_id = '108191618273119179607';
UPDATE posts set like_count = like_count + 1 WHERE id = 4;
update users set total_like = total_like + 1 where id = '3';
