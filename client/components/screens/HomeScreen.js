import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View styles={styles.container}>
      <Text style={styles.Text}>This is the Home Screen :)</Text>
    </View>
  
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  Text: {
    fontSize: 25,
    color: 'darkslateblue'
  }
});