import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlants } from '../../store/plants';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const plantArray = useSelector(state => state.plants.list)

  useEffect(()=>{
    dispatch(loadPlants());
  }, [])

  const dummy = [
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

  return (
    <ScrollView styles={styles.container}>
      {dummy.map(post => (
        <View style={styles.post} key={post.username}>
          <Image style={styles.image} source={{ uri: post.url }}/>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.message}>{post.message}</Text>
          <Text style={styles.tags}>{post.tags}</Text>
        </View>
      ))}
      {/* <Text style={styles.Text}>{plantArray[3].employee_salary}</Text> */}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  username: {
    fontSize: 25,
    color: 'forestgreen',
    alignSelf: 'center',
  },
  message: {
    alignSelf: 'center',
  },
  tags: {
    color: 'blue',
    alignSelf: 'center',
  },
  post: {
    borderBottomColor: 'forestgreen',
    borderBottomWidth: 2,
    marginBottom: 30,
  },
});