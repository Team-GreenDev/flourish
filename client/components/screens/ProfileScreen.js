import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../../store/slices/posts';

  // MISSING FUNCTIONALITY: Dynamically render Followers, Following, and all posts current user has liked

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const currentUser = useSelector(state => state.auth.currentUser);

  useEffect(()=>{
    dispatch(loadPosts());
  }, [])

  // Used to get the current users posts
  const getPostById = (id) => posts.list.filter((post) => post.user_id === id);

  // Boolean to view current users posts or current users liked posts (could move to the store eventually)
  const [boolean, setBoolean] = useState(true);


  // Dummy data that needs to be replaced with backend data
  let userInfo = {
    followingCount: 10,
    followerCount: 50,
    seedCount: 9001
  };

  // Dummy data of 'liked' posts
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

  // Mapping over fake static posts that the user has 'liked'
  const likeData = likeDummy.map(post => (
    <View key={post.username}>
      <View style={styles.post}>
        <Image style={styles.image} source={{ uri: post.url }}/>
        <Text style={styles.postUsername}>{post.username}</Text>
        <Text style={styles.message}>{post.message}</Text>
        <Text style={styles.tags}>{post.tags}</Text>
      </View>
    </View>
  ));

  // Maps over the current users posts to list them on profile feed
  const postData = getPostById(currentUser.id).map(post => (
    <View key={post.id}>
      <View style={styles.post}>
        <Image style={styles.image} source={{ uri: post.url }}/>
        <Text style={styles.postUsername}>{currentUser.username}</Text>
        <Text style={styles.message}>{post.text}</Text>
        <Text style={styles.tags}>#plants #cool #pokemon</Text>
      </View>
    </View>
  ));

  return (
    <ScrollView styles={styles.container}>
      <View>
        <Image style={styles.profilePic} source={{uri: currentUser.image_url}}/>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.username}>{currentUser.username}</Text>
          <Text style={styles.bio}>I love plants, people, and puppies!</Text>
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