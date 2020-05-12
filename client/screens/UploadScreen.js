import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UploadScreen() {
  return (
    <View>
      <Text style={styles.Text}>This is the Upload Screen :)</Text>
    </View>
  
  );
}


const styles = StyleSheet.create({
  Text: {
    color: 'darkslateblue'
  }
});