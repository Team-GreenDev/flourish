import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../store/slices/users';
import { loadPosts } from '../../store/slices/posts';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  const posts = useSelector(state => state.posts)

  const getUserById = (id) => users.list.filter((user) => user.id === id);

  useEffect(()=>{
    dispatch(loadUsers());
    dispatch(loadPosts());
  }, [])

  return (
    <ScrollView styles={styles.container}>
      {posts.loading && users.loading
        ? (<View><Text>loading</Text></View>)
        : (posts.list.map(post => {
          const name = getUserById(post.id)[0].username;
          return (
          <View key={post.id}>
            <Text> </Text>
            <View style={styles.post}>
              <Image style={styles.image} source={{ uri: post.url }}/>
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.message}>{post.text}</Text>
              <Text style={styles.tags}>#plants #cool #pokemon</Text>
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
    height: 300,
    width: 300,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  username: {
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