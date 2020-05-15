import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function ProfileScreen() {

  let messageDummy = [{
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Sup you into plants',
    created_at: '3:20 PM'
  },
  {
    username: 'Brad',
    profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
    lastMessage: 'I love your fern :)',
    created_at: '1:27 PM'
  },
  {
    username: 'Tad',
    profilePic: 'https://randomuser.me/api/portraits/men/4.jpg',
    lastMessage: 'You are so beautiful',
    created_at: '1:21 PM'
  },
  {
    username: 'Pirahna Plant',
    profilePic: 'https://www.mariowiki.com/images/thumb/4/44/Big_Piranha_Plant_SM3DW_Prima.jpg/1200px-Big_Piranha_Plant_SM3DW_Prima.jpg',
    lastMessage: 'Do you have a little plant in you?',
    created_at: '12:20 PM'
  },
]
  return (
    <ScrollView>
    <SearchBar
      placeholder="Search Messages..."
    />
      {messageDummy.map(user => (
        <TouchableOpacity style={styles.messagesContainer}>
          <Image style={styles.messagesImage} source={{uri: user.profilePic}}/>
          <View style={styles.vertText}>
            <Text style={styles.messagesUsername}>{user.username}</Text>
            <Text style={styles.messagesText} >{user.lastMessage}</Text>
          </View>
          <Text>{user.created_at}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView> 
  
  );
}


const styles = StyleSheet.create({
  messagesContainer: {
    flexDirection: 'row',
  },
  messagesImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    margin: 7,
    borderRadius: 100 / 2,
  },
  messagesText: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 10,
  },
  messagesUsername: {
    fontSize: 15
  },
  vertText: {
    flexDirection: 'column'
  }
});