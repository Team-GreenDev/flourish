import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View>
      <Text style={styles.Text}>This is the Profile Screen :)</Text>
    </View>
  
  );
}


const styles = StyleSheet.create({
  Text: {
    color: 'darkslateblue'
  }
});