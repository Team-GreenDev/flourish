import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfilePostsScreen() {
  return (
    <View styles={styles.container}>
      <Text style={styles.Text}>This is the Posts Screen :)</Text>
    </View>
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: 25,
    color: 'darkslateblue'
  }
});