import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
 
  const [boolean, setBoolean] = useState(true);
  const postMessage = <Text> You are viewing the posts </Text>;
  const likeMessage = <Text> You are viewing the likes </Text>;

  return (
    <ScrollView styles={styles.container}>
      <View>
        <Image style={styles.profilePic} source={{uri: 'https://randomuser.me/api/portraits/women/2.jpg'}}/>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.username}>Karen Boomer</Text> 
          <Text style={styles.bio}>This is my bio.</Text>
          <View style={styles.followCount}>
            <Text style={styles.followText}>10 Following</Text>
            <Text style={styles.followText}>50 Followers</Text>
            <Text style={styles.followText}>9001 Seeds</Text>
          </View>
        </TouchableOpacity>
          <View style={styles.iconView}>
            <Ionicons style={styles.icon} name="md-grid" size={30} onPress={() => setBoolean(true)}/>
            <Ionicons style={styles.icon} name="md-thumbs-up" size={30} onPress={() => setBoolean(false)}/>
          </View>
          <View>
          {boolean ? (postMessage) : (likeMessage)}
          </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  profilePic: {
    alignSelf: 'center',
    marginTop: 30,
    width: 125,
    height: 125,
    borderRadius: 100 / 2,
  },
  infoContainer: {
    backgroundColor: '#f0efeb',
  },
  username: {
    marginTop: 10,
    fontSize: 30,
    alignSelf: 'center',
  },
  bio: {
    alignSelf: 'center'
  },
  followCount: {
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'center',
  },
  followText: {
   margin: 10,
  },
  iconView: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  icon: {
    color: 'forestgreen',
    marginBottom: 5,
    marginHorizontal: 75,
    } 
});