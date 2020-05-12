import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NotificationScreen() {
  return (
    <View>
      <Text style={styles.Text}>This is the Notification Screen :)</Text>
    </View>
  
  );
}


const styles = StyleSheet.create({
  Text: {
    color: 'darkslateblue'
  }
});