import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function ProfileScreen({ history }) {

  let messageDummy = [{
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Sup you into plants',
    created_at: '3:20 PM'
  },
  {
    username: 'Brad',
    profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
    lastMessage: 'I love your ferns!',
    created_at: '1:27 PM'
  },
  {
    username: 'Tad',
    profilePic: 'https://randomuser.me/api/portraits/men/4.jpg',
    lastMessage: 'You are so such a good gardener!',
    created_at: '1:21 PM'
  },
  {
    username: 'Kyle',
    profilePic: 'https://randomuser.me/api/portraits/men/5.jpg',
    lastMessage: 'Do you have any house plants?',
    created_at: '12:20 PM'
  },
]
  return (
    <ScrollView>
    <SearchBar
      placeholder="Search Messages..."
    />
      {messageDummy.map(user => (
        <TouchableOpacity key={user.username} style={styles.messagesContainer} onPress={() => {
          console.log(user.username);
          history.push("/privatemessages")}}>
          <Image style={styles.messagesImage} source={{uri: user.profilePic}}/>
          <View style={styles.vertText} >
            <Text style={styles.messagesUsername}>{user.username}</Text>
            <Text style={styles.messagesText} >{user.lastMessage}</Text>
          </View>
          <Text style={styles.timeStamp}>{user.created_at}</Text>
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
    fontSize: 15,
    color: '#94a57e',
    fontWeight: 'bold',
  },
  vertText: {
    flexDirection: 'column'
  },
  timeStamp: {
    color: '#94a57e',
    position: 'absolute',
    left: 340,
  }
});