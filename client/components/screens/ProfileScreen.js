import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../../store/slices/posts';

  // MISSING FUNCTIONALITY: Dynamically render all posts current user has liked

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const currentUser = useSelector(state => state.auth.currentUser);
  const followers = useSelector(state => state.follow.followers);
  const following = useSelector(state => state.follow.following);

  useEffect(()=>{
    dispatch(loadPosts());
  }, [])

  // Used to get the current users posts
  const getPostById = (id) => posts.list.filter((post) => post.user_id === id);

  // Boolean to view current users posts or current users liked posts (could move to the store eventually)
  const [boolean, setBoolean] = useState(true);

  // Dummy data of 'liked' posts
  const likeDummy = [
    {
      url: 'https://media.architecturaldigest.com/photos/5a94846e4692126e06f34f67/master/w_1600%2Cc_limit/popular-houseplants-pilea-peperomioides.jpg',
      username: 'Rachel Davis',
      message: 'Army of five, might even go pick up some more!',
      tag: '#favplants #new2flourish',
    },
    {
      url: 'https://secure.img1-fg.wfcdn.com/im/42349074/resize-h600%5Ecompr-r85/8506/85069027/Tejeda+5+Tier+Self-Watering+Wood+Vertical+Garden.jpg',
      username: 'Jaime Vazquez',
      message: 'Five tier wall garden is looking healthy this month',
      tag: '#favplants #new2flourish',
    },
    {
      url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/high-angle-view-of-potted-cactus-royalty-free-image-1568039795.jpg?crop=0.752xw:1.00xh;0.139xw,0&resize=480:*',
      username: 'Brenden Malone',
      message: 'Check out this succulent collection',
      tag: '#favplants #new2flourish',
    },
  ]

  // Mapping over fake static posts that the user has 'liked'
  const likeData = likeDummy.map(post => (
    <View key={post.username}>
      <View style={styles.post}>
        <Image style={styles.image} source={{ uri: post.url }}/>
        <Text style={styles.postUsername}>{post.username}</Text>
        <Text style={styles.message}>{post.message}</Text>
        <Text style={styles.tags}>{post.tag}</Text>
      </View>
    </View>
  ));

  // Maps over the current users posts to list them on profile feed
  const postData = getPostById(currentUser.id).reverse().map(post => (
    <View key={post.id}>
      <View style={styles.post}>
        <Image style={styles.image} source={{ uri: post.url }}/>
        <Text style={styles.postUsername}>{currentUser.username}</Text>
        <Text style={styles.message}>{post.text}</Text>
        <Text style={styles.tags}>{post.tag}</Text>
      </View>
    </View>
  ));

  return (
    <ScrollView styles={styles.container}>
      <View>
        <Image style={styles.profilePic} source={{uri: currentUser.image_url}}/>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.username}>{currentUser.username}</Text>
          <Text style={styles.bio}>{currentUser.bio}</Text>
          <View style={styles.followCount}>
            <Text style={styles.followText}>{following.length} Following</Text>
            <Text style={styles.followText}>{followers.length} Followers</Text>
            <Text style={styles.followText}>{currentUser.total_like} Seeds</Text>
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