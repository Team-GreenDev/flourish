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
        <View>
          <Text> </Text>
          <View style={styles.post} key={post.username}>
            <Image style={styles.image} source={{ uri: post.url }}/>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.message}>{post.message}</Text>
            <Text style={styles.tags}>{post.tags}</Text>
          </View>
          <Text> </Text>
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