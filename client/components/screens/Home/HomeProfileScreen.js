import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'


  // MISSING FUNCTIONALITY: Dynamically render Followers, Following, and all posts current user has liked

export default function HomeProfileScreen({ history }) {
  const posts = useSelector(state => state.posts);
  const clickedUser = useSelector(state => state.users.clickedUser);

  // Used to get the current users posts
  const getPostById = (id) => posts.list.filter((post) => post.user_id === id);

  // Boolean to view current users posts or current users liked posts (could move to the store eventually)
  const [boolean, setBoolean] = useState(true);


  // Dummy data that needs to be replaced with backend data
  let userInfo = {
    followingCount: 10,
    followerCount: 50,
    seedCount: 343
  };

  // Mapping over fake static posts that the user has 'liked'
  const likeData = 
    <View key='Barry Allen'>
      <View style={styles.post}>
        <Image style={styles.image} source={{ uri: 'https://smoenergy.com/wp-content/uploads/2019/05/House-Plants-Blog-Image.jpg' }}/>
        <Text style={styles.postUsername}>Barry Allen</Text>
        <Text style={styles.message}>Getting a nice collection going!</Text>
        <Text style={styles.tags}>'#favplants #new2flourish'</Text>
      </View>
    </View>
  ;

  // Maps over the current users posts to list them on profile feed
  const postData = getPostById(clickedUser.id).reverse().map(post => (
    <View key={post.id}>
      <View style={styles.post}>
        <Image style={styles.image} source={{ uri: post.url }}/>
        <Text style={styles.postUsername}>{clickedUser.username}</Text>
        <Text style={styles.message}>{post.text}</Text>
        <Text style={styles.tags}>#favplants #new2flourish</Text>
      </View>
    </View>
  ));

  return (
    <ScrollView styles={styles.container}>
      <TouchableOpacity onPress={() => history.push("/")} style={{ flex: 1, paddingLeft: 10 }}>
        <MaterialCommunityIcons name="keyboard-backspace" color="black" size={35}/>
      </TouchableOpacity>
      <View>
        <Image style={styles.profilePic} source={{uri: clickedUser.image_url}}/>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.username}>{clickedUser.username}</Text>
          <Text style={styles.bio}>{clickedUser.bio}</Text>
            {/* All static "following/follower" dummy data */}
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
    paddingTop: 5,
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
    // adding space between posts
    marginBottom: 30,

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