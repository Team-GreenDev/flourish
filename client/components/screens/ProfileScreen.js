import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { loadPosts, loadLikedPosts } from '../../store/slices/posts';
import { loadSeeds } from '../../store/slices/seeds';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const currentUser = useSelector(state => state.auth.currentUser);
  const followers = useSelector(state => state.follow.followers);
  const following = useSelector(state => state.follow.following);
  const seedCount = useSelector(state => state.seeds.count);
  const likedPosts = useSelector(state => state.posts.likedPosts);
  const users = useSelector(state => state.users)

  // Switch views between user's posts and liked posts
  const [feedView, setFeedView] = useState(true);

  const getUserById = (id) => users.list.filter((user) => user.id == id);

  useEffect(()=>{
    dispatch(loadSeeds(currentUser.id));
    dispatch(loadPosts());
    dispatch(loadLikedPosts(currentUser.id));
  }, [posts.postAdded])

  // Used to get the current users posts
  const getPostById = (id) => posts.list.filter((post) => post.user_id === id);

  // Mapping liked posts
  const likeData = likedPosts.slice().reverse().map(post => {
    const user = getUserById(post.user_id)[0];
    return (
      <View key={post.id}>
        <View style={styles.post}>
          <Image style={styles.image} source={{ uri: post.url }}/>
          <Text style={styles.postUsername}>{user.username}</Text>
          <Text style={styles.message}>{post.text}</Text>
          <Text style={styles.tags}>{post.tag}</Text>
        </View>
      </View>
  )});

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
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity elevation={5} style={styles.infoContainer}>
        <Image style={styles.profilePic} source={{uri: currentUser.image_url}}/>
          {/* <Text style={styles.username}>{currentUser.username}</Text> */}
          <Text style={styles.bio}>{currentUser.bio}</Text>
          <View style={styles.followCount}>
            <Text style={styles.followText}>{following.length} Following</Text>
            <Text style={styles.followText}>{followers.length} Followers</Text>
            <Text style={styles.followText}>{seedCount} Seeds</Text>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity>
              <Ionicons style={styles.icon} name="md-grid" size={30} onPress={() => setFeedView(true)}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons style={styles.icon} name="md-thumbs-up" size={30} onPress={() => setFeedView(false)}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
          <View>
          {feedView ? (postData) : (likeData)}
          </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8F2D8',
  },
  profilePic: {
    alignSelf: 'center',
    marginTop: 30,
    width: 125,
    height: 125,
    borderRadius: 100 / 2,
  },
  infoContainer: {
    marginBottom: 25,
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
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
    color: '#697A44',
    marginBottom: 5,
    marginHorizontal: 75,
    marginVertical: 5,
    },
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 5,
    },
  postUsername: {
    fontSize: 18,
    color: '#697A44',
    fontWeight: "600",
    fontFamily: "Thonburi",
    marginHorizontal: 10,
    marginBottom: 10,
    },
  message: {
    fontSize: 16,
    marginHorizontal:10,
    fontFamily: "Trebuchet MS",
    },
  tags: {
    color: '#69747C',
    fontWeight: "600",
    fontSize: 16,
    marginHorizontal:10,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: "Trebuchet MS"
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
    justifyContent: "space-evenly",
    flex: 1,
    },

});