import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileLikesScreen() {
  return (
    <View styles={styles.container}>
      <Text style={styles.Text}>This is the Likes Screen :)</Text>
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