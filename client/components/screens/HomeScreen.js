import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts, likePost, unlikePost } from '../../store/slices/posts';
import { MaterialCommunityIcons } from '@expo/vector-icons'


export default function HomeScreen({ likedPosts }) {
  const users = useSelector(state => state.users)
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const getUserById = (id) => users.list.filter((user) => user.id == id);

  useEffect(()=>{
    dispatch(loadPosts());
  }, [posts.postAdded])

  const addLike = (post) => {
    console.log(post);
    dispatch(likePost(post));
  }

  const unlike = (post) => {
    console.log('unliked', post)
    dispatch(unlikePost(post));
  }

  return (
    <ScrollView styles={styles.container}>
      {posts.lists
        ? (<View><Text>loading</Text></View>)
        : (posts.list.slice(0).reverse().map(post => {

          const name = getUserById(post.user_id)[0].username;
          return (
          <View key={post.id}>
            <Text> </Text>
            <View style={styles.post}>
              <Image style={styles.image} source={{ uri: post.url }}/>
              <View style={styles.likesContainer}>
              <Text style={styles.username}>{name}</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons
                    name={"flower-tulip"}
                    size={24}
                    raised
                    style={styles.icon}
                    onPress={
                      like === false ? () => {
                        setLike(true)
                        addLike(post)  }
                        : () => {
                          setLike(false)
                          unlike(post)
                        }
                      }
                    />
                    <Text>{post.like_count}</Text>
              </TouchableOpacity>
              </View>
              <Text style={styles.message}>{post.text}</Text>
              <Text style={styles.tags}>#favplants #new2flourish</Text>
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
  likesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    color: "white",
    
  }
});