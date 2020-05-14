import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
 
  const [boolean, setBoolean] = useState(true);
  
  let userInfo = {
    userName: 'Karen Boomer',
    bio: 'This is my bio.',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    followingCount: 10,
    followerCount: 50,
    seedCount: 9001
  };

  const likeDummy = [
    {
      url: 'https://img.pokemondb.net/artwork/large/bellsprout.jpg',
      username: 'Bellsprout',
      message: 'This is dummy message blah blah blah',
      tags: '#plants #cool #pokemon',
    },
    {
      url: 'https://img.pokemondb.net/artwork/large/weepinbell.jpg',
      username: 'Weepinbell',
      message: 'This is dummy message blah blah blah weep weep etc etc etc',
      tags: '#plants #cool #pokemon',
    },
    {
      url: 'https://img.pokemondb.net/artwork/large/victreebel.jpg',
      username: 'Victreebel',
      message: 'This is dummy message blah blah blah one two three four five six seven eight nine',
      tags: '#plants #cool #pokemon',
    },
    {
      url: 'https://img.pokemondb.net/artwork/large/oddish.jpg',
      username: 'Oddish',
      message: 'This is dummy message blah blah blah useless pokemon ',
      tags: '#plants #cool #pokemon',
    },
    {
      url: 'https://img.pokemondb.net/artwork/large/bulbasaur.jpg',
      username: 'Bulbasaur',
      message: 'This is dummy message blah blah blahkfldsfj aslkdf  sadlfj lk sad flkfdsjfl kdsjf lsajf laj ldaksfjl slajf las laj flasd ',
      tags: '#plants #cool #pokemon',
    },
  ]
const likeData = likeDummy.map(post => (
  <View>
    <Text> </Text>
    <View style={styles.post} key={post.username}>
      <Image style={styles.image} source={{ uri: post.url }}/>
      <Text style={styles.postUsername}>{post.username}</Text>
      <Text style={styles.message}>{post.message}</Text>
      <Text style={styles.tags}>{post.tags}</Text>
    </View>
    <Text> </Text>
  </View>
));

const postDummy = [
  {
    url: 'https://images.homedepot-static.com/productImages/790339f3-49a5-49ae-9418-bbd7a015c8e4/svn/pure-beauty-farms-house-plants-dc10sanlaur-64_1000.jpg',
    username: 'Karen Boomer',
    message: 'This is my post',
    tags: '#plants #cool #pokemon',
  },
  {
    url: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557258847-chinese-evergreen-houseplant-1557258690.jpg?crop=0.883xw:0.887xh;0.0849xw,0.0821xh&resize=480:*',
    username: 'Karen Boomer',
    message: 'I like plants',
    tags: '#plants #cool #pokemon',
  },
  {
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/high-angle-view-of-potted-cactus-royalty-free-image-1568039795.jpg?crop=0.752xw:1.00xh;0.139xw,0&resize=480:*',
    username: 'Karen Boomer',
    message: 'Plants taste good',
    tags: '#plants #cool #pokemon',
  },
  {
    url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/products/2019/9/19/3/RX_1800Flowers_Money-Plant.jpg.rend.hgtvcom.616.616.suffix/1568931656068.jpeg',
    username: 'Karen Boomer',
    message: 'Hi, Im barbie ',
    tags: '#plants #cool #pokemon',
  },
  {
    url: 'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
    username: 'Karen Boomer',
    message: '*Your ',
    tags: '#plants #cool #pokemon',
  },
]

const postData = postDummy.map(post => (
  <View>
    <Text> </Text>
    <View style={styles.post} key={post.username}>
      <Image style={styles.image} source={{ uri: post.url }}/>
      <Text style={styles.postUsername}>{post.username}</Text>
      <Text style={styles.message}>{post.message}</Text>
      <Text style={styles.tags}>{post.tags}</Text>
    </View>
    <Text> </Text>
  </View>
));

  return (
    <ScrollView styles={styles.container}>
      <View>
        <Image style={styles.profilePic} source={{uri: userInfo.profilePic}}/>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.username}>{userInfo.userName}</Text> 
          <Text style={styles.bio}>{userInfo.bio}</Text>
          <View style={styles.followCount}>
            <Text style={styles.followText}>{userInfo.followingCount} Following</Text>
            <Text style={styles.followText}>{userInfo.followerCount} Followers</Text>
            <Text style={styles.followText}>{userInfo.seedCount} Seeds</Text>
          </View>
        </TouchableOpacity>
          <View style={styles.iconView}>
            <TouchableOpacity>
              <Ionicons style={styles.icon} name="md-grid" size={30} onPress={() => setBoolean(true)}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons style={styles.icon} name="md-thumbs-up" size={30} onPress={() => setBoolean(false)}/>
            </TouchableOpacity>
          </View>
          <View>
          {boolean ? (postData) : (likeData)}
          </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  profilePic: {
    alignSelf: 'center',
    marginTop: 30,
    width: 125,
    height: 125,
    borderRadius: 100 / 2,
  },
  infoContainer: {
    backgroundColor: '#f0efeb',
  },
  username: {
    marginTop: 10,
    fontSize: 30,
    alignSelf: 'center',
  },
  bio: {
    alignSelf: 'center'
  },
  followCount: {
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'center',
  },
  followText: {
   margin: 10,
  },
  iconView: {
    borderRadius: 1,
    borderColor: 'black',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  icon: {
    color: 'forestgreen',
    marginBottom: 5,
    marginHorizontal: 75,
    },
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    },
  postUsername: {
    fontSize: 25,
    color: 'forestgreen',
    },
  message: {
      
    },
  tags: {
    color: 'blue',
    },
  post: {
    // Setting up image width.
    width: 300,
      
    // Set border width.
    borderWidth: 1,
      
    // Set border Hex Color code here.
    borderColor: '#C0CDC6',
      
    // Set border Radius.
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#C0CDC6',
    }, 
});