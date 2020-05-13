import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../icons/TabBarIcon';
import ProfileLikesScreen from './ProfileLikesScreen';
import ProfilePostsScreen from './ProfilePostsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Posts';

export default function ProfileScreen() {
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
          <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
              name="Posts"
              component={ProfilePostsScreen}
              options={{
               tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-apps" />,
                }}
            />
            <BottomTab.Screen
              name="Likes"
              component={ProfileLikesScreen}
              options={{
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-thumbs-up" />,
              }}
            />
          </BottomTab.Navigator>
        </TouchableOpacity>
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
});