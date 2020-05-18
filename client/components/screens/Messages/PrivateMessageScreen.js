import React from 'react';
import {Text, Button, View, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native';

export default function PrivateMessageScreen({ history }){

  let messageDummy = [{
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Sup you into plants',
    created_at: '3:20 AM',
    id: 1,
  },
  {
    username: 'James Easter',
    profilePic: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WmtzXedJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/350985/7b8fc9d7-e830-4ca2-905c-5691bcb16f99.jpeg',
    lastMessage: 'Yeah man! Just got a new fern.',
    created_at: '3:27 AM',
    id: 2,
  },
  {
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'That\'s really cool! I\'m mostly into cactus myself',
    created_at: '8:27 AM',
    id: 3,
  },
  {
    username: 'James Easter',
    profilePic: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WmtzXedJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/350985/7b8fc9d7-e830-4ca2-905c-5691bcb16f99.jpeg',
    lastMessage: 'Cactuses are nice too',
    created_at: '8:47 AM',
    id: 4,
  },
  {
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Yeah I am very busy, and they are really easy to take care of',
    created_at: '11:21 AM',
    id: 5,
  },
  {
    username: 'James Easter',
    profilePic: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WmtzXedJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/350985/7b8fc9d7-e830-4ca2-905c-5691bcb16f99.jpeg',
    lastMessage: 'Yeah I have a couple lying around myself',
    created_at: '11:27 AM',
    id: 6,
  },
  {
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'You should check out my post I made on cactus',
    created_at: '12:20 PM',
    id: 7,
  },
  {
    username: 'James Easter',
    profilePic: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WmtzXedJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/350985/7b8fc9d7-e830-4ca2-905c-5691bcb16f99.jpeg',
    lastMessage: 'Will do man!',
    created_at: '2:27 PM',
    id: 8,
  },
]

  return (
    <ScrollView>
    <Button
    title="Back"
    onPress={() => history.push("/")}/>
      {messageDummy.map(user => (
        <TouchableOpacity style={styles.messagesContainer} key={user.id}>
          <Image style={styles.messagesImage} source={{uri: user.profilePic}}/>
          <View style={styles.vertText} >
            <Text style={styles.messagesUsername}>{user.username}</Text>
            <Text style={styles.messagesText} >{user.lastMessage}</Text>
          </View>
          <Text style={styles.timeStamp}>{user.created_at}</Text>
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
    marginLeft: 10,
    marginBottom: 5,
    maxWidth: 345,
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
  },
  timeStamp: {
    color: 'forestgreen',
    position: 'absolute',
    left: 340,
  }
});