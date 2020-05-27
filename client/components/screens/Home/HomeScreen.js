import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { loadPosts, likePost, loadLikedPosts } from '../../../store/slices/posts';
import { clickedUserAssigned } from '../../../store/slices/users';
import { loadFollowers, loadFollowing } from '../../../store/slices/follow';

export default function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  const posts = useSelector(state => state.posts)
  const currentUser = useSelector(state => state.auth.currentUser);
  const usersImFollowing = useSelector(state => state.follow.following.map(user => user.id));
  const likedPostsIds = useSelector(state => state.posts.likedPosts.map(post => post.id));

  const allPostsFromFollowing = posts.list.filter(post => usersImFollowing.includes(post.user_id))
  const [ feed, setFeed ] = useState(true)

  const getUserById = (id) => users.list.filter((user) => user.id == id);

  useEffect(()=>{
    dispatch(loadPosts());
    dispatch(loadLikedPosts(currentUser.id))
  }, [posts.postAdded])

  useEffect(() => {
    dispatch(loadFollowers(currentUser.id));
    dispatch(loadFollowing(currentUser.id));
  }, [])

  const addLike = (ids) => {
    dispatch(likePost(ids));
  }

  const handlePress = (user) => {
    dispatch(clickedUserAssigned(user))
    history.push("/profile");
  }

  const handleDiscover = () => {
    setFeed(true);
  }

  const handleYourFeed = () => {
    setFeed(false);
  }


  return (
    <View>
      <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "#C0CDC6"}}>
        <View style={{flexDirection: "row", width: "50%", justifyContent: "space-between"}}>
        <TouchableOpacity
          onPress={handleDiscover}
          style={{borderRadius: 10, padding: 4, margin: 4, backgroundColor: feed ? "#697A44" : null, width: 100, alignItems: "center"}}
        >
          <Text style={{color: "white", fontSize: 18}}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleYourFeed}
          style={{borderRadius: 10, padding: 4, margin: 4, backgroundColor: feed ? null : "#697A44", width: 100, alignItems: "center"}}>
          <Text style={{color: "white", fontSize: 18}}>Following</Text>
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView styles={styles.container}>
        {feed
          ? (posts.list.slice(0).reverse().map(post => {
            const user = getUserById(post.user_id)[0];
            return (
            <View key={post.id}>
              <Text> </Text>
              <View style={styles.post} onPress={() => console.log("apple")} >
                <TouchableOpacity onPress={() => history.push("/comments")}>
                <Image style={styles.image} source={{ uri: post.url }}/>
                </TouchableOpacity>
                <View style={styles.likesContainer}>
                <Text style={styles.username} onPress={() => handlePress(user)}>{user.username}</Text>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                      name={"flower-tulip"}
                      size={24}
                      raised
                      style={{color: likedPostsIds.includes(post.id) ? "green" : "white"}}
                      onPress={() => addLike({id: post.id, user_id: currentUser.id})}
                      />
                      <Text>{post.like_count}</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.body}>
                <Text style={styles.message} numberOfLines={2}>{post.text}</Text>
                <Text style={styles.tags}>{post.tag}</Text>
                </View>
              </View>
              <Text> </Text>
            </View>
            )}))
            : (allPostsFromFollowing.slice(0).reverse().map(post => {
              const user = getUserById(post.user_id)[0];
              return (
              <View key={post.id}>
                <Text> </Text>
                <View style={styles.post} onPress={() => console.log("apple")} >
                  <TouchableOpacity onPress={() => history.push("/comments")}>
                  <Image style={styles.image} source={{ uri: post.url }}/>
                  </TouchableOpacity>
                  <View style={styles.likesContainer}>
                  <Text style={styles.username} onPress={() => handlePress(user)}>{user.username}</Text>
                  <TouchableOpacity style={{flexDirection: 'row'}}>
                        <MaterialCommunityIcons
                        name={"flower-tulip"}
                        size={24}
                        raised
                        style={{color: likedPostsIds.includes(post.id) ? "green" : "white"}}
                        onPress={() => addLike({id: post.id, user_id: currentUser.id})}
                        />
                        <Text>{post.like_count}</Text>
                  </TouchableOpacity>
                  </View>
                  <View style={styles.body}>
                  <Text style={styles.message} numberOfLines={2}>{post.text}</Text>
                  <Text style={styles.tags}>{post.tag}</Text>
                  </View>
                </View>
                <Text> </Text>
              </View>
              )}))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  image: {
    height: 350,
    width: 325,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  username: {
    fontSize: 18,
    color: '#697A44',
    fontWeight: "600",
    fontFamily: "Thonburi"
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
  body: {
    justifyContent: 'space-around',
    
  },
  post: {
    // Setting up image width.
    width: 325,
    height: 450,
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
  likesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal:10,
  },
  icon: {
    color: "white",
  }
});