
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = React.useState("");
  const [photo, setPhoto] = React.useState('');
  // 
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dsw29lceg/upload'
  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    let data = {
      "file": base64Img,
      "upload_preset": "cdqppny0"
    }

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      setPhoto(data.url);
    }).catch(err => console.log(err))
  };

  const uploadPost = () => {
    console.log(photo);
  }

  const removePhoto = () => {
    setPhoto('');
  }
  return (
    <View>
       <TextInput
      style={styles.input}
      placeholder="Post about your plants!"
      />
      <SafeAreaView style={styles.imageUploadView}>
      {photo === '' ? 
      <Image onPress={() => removePhoto()} style={styles.imageUpload} source={{uri: ''}} /> :
      <Image style= {styles.imageUpload} source={{uri: photo}} />}
      </SafeAreaView>
      <Button
      onPress={() => console.log('alert')}
      style={styles.button}
      title="Post"
      color="forestgreen"
      />
      <View style={styles.iconsView}>
        {/* <TouchableOpacity>
          <Ionicons style={styles.icon} name="ios-camera" size={50} />
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Ionicons style={styles.icon} name="ios-image" size={50} onPress={() => openImagePickerAsync()}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 150,
    backgroundColor: '#ede9d9'
  },
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    margin: 5,
    color: 'forestgreen',
  },
  imageUpload: {
    margin: 5,
    width: 150,
    height: 150
  },
  imageUploadView: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});



