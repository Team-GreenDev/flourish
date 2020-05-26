import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts, likePost } from '../../../store/slices/posts';
import { clickedUserAssigned } from '../../../store/slices/users';

import { MaterialCommunityIcons } from '@expo/vector-icons'



export default function HomeScreen({ likedPosts, history }) {
  const users = useSelector(state => state.users)
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch();

  const getUserById = (id) => users.list.filter((user) => user.id == id);

  useEffect(()=>{
    dispatch(loadPosts());
  }, [posts.postAdded])

  const addLike = (post) => {
    dispatch(likePost(post));
  }

  const handlePress = (user) => {
   dispatch(clickedUserAssigned(user))
   history.push("/profile");
  } 

  return (
    <ScrollView styles={styles.container}>
      {posts.lists
        ? (<View><Text>loading</Text></View>)
        : (posts.list.slice(0).reverse().map(post => {

          const user = getUserById(post.user_id)[0];
          return (
          <View key={post.id}>
            <Text> </Text>
            <View style={styles.post}>
              <Image style={styles.image} source={{ uri: post.url }}/>
              <View style={styles.likesContainer}>
              <Text style={styles.username} onPress={() => handlePress(user)}>{user.username}</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons
                    name={"flower-tulip"}
                    size={24}
                    raised
                    style={styles.icon}
                    onPress={() => addLike(post)}
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