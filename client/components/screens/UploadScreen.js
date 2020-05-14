import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UploadScreen() {
  return (
    <View>
      <TextInput 
      style={styles.input}
      placeholder="Post about your plants!"
      />
      <View style={styles.iconsView}>
        <TouchableOpacity>
          <Ionicons style={styles.icon} name="ios-camera" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons style={styles.icon} name="ios-image" size={30} />
        </TouchableOpacity>
      </View>
      <Button
      style={styles.button}
      title="Post"
      color="forestgreen"
      />
    </View>
  
  );
}


const styles = StyleSheet.create({
  input: {
    height: 200,
    backgroundColor: '#ede9d9'
  },
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    margin: 5,
    color: 'forestgreen',
  }
});