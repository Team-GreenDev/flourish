import React from 'react';
import {Text, Button, View, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native';

export default function PrivateMessageScreen({ history }){

  let messageDummy = [{
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Sup you into plants',
    created_at: '3:20 AM'
  },
  {
    username: 'Karen Boomer',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    lastMessage: 'Please dont talk 2 me',
    created_at: '3:27 AM'
  },
  {
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'I love your fern :)',
    created_at: '8:27 AM'
  },
  {
    username: 'Karen Boomer',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    lastMessage: 'I have a bf',
    created_at: '8:47 AM'
  },
  {
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'You are so beautiful',
    created_at: '11:21 AM'
  },
  {
    username: 'Karen Boomer',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    lastMessage: 'I will block u',
    created_at: '11:27 AM'
  },
  {
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Please anser me',
    created_at: '12:20 PM'
  },
  {
    username: 'Karen Boomer',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    lastMessage: 'No!',
    created_at: '2:27 PM'
  },
]

  return (
    <ScrollView>
    <Button
    title="Back"
    onPress={() => history.push("/")}/>
      {messageDummy.map(user => (
        <TouchableOpacity style={styles.messagesContainer}>
          <Image style={styles.messagesImage} source={{uri: user.profilePic}}/>
          <View style={styles.vertText} >
            <Text style={styles.messagesUsername}>{user.username}</Text>
            <Text style={styles.messagesText} >{user.lastMessage}</Text>
          </View>
          <Text>{user.created_at}</Text>
        </TouchableOpacity>
      ))}
    <TextInput 
    style={styles.input}
      placeholder="Send a message..."/> 
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
  },
  input: {
    height: 40,
    fontSize: 20,
    backgroundColor: '#E9F1E9',
  }
});