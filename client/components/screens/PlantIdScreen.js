import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';


const PlantIdScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);

  const [photo, setPhoto] = useState('');

  const PLANT_ID_URL = 'https://api.plant.id/v2/identify';

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

    const data = {
      api_key: "KS6TZZRUA1RqTfiWM2ojZv1IQ4frPWlEK0AxFZeVFXhxYMn99u",
      images: base64Img,
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: ["common_names",
                        "url",
                        "name_authority",
                        "wiki_description",
                        "taxonomy",
                        "synonyms"]
    };

    fetch(PLANT_ID_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data.suggestions);
    })
    .catch((error) => {
      console.error('Error from plantId:', error);
    });
  };

  const handleSubmit = () => {
    console.log("submit button")
  }

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Text>plant id</Text>
        {/* {photo === '' ? null : <Image style= {styles.imageUpload} source={{uri: photo}} />} */}
      </SafeAreaView>
      <View style={styles.iconsView}>
        <TouchableOpacity>
          <Ionicons style={styles.icon} name="ios-image" size={50} onPress={() => openImagePickerAsync()}/>
        </TouchableOpacity>
      </View>
      <Button onPress={handleSubmit} title="Identify Plant" />
    </View>
    )
  }

export default PlantIdScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    margin: 5,
    color: 'forestgreen',
    },
    text: {
      color: "#0c0c0c",
      fontSize: 18,
      fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
      input: {
      height: 150,
        backgroundColor: '#ede9d9'
      },
      iconsView: {
      flexDirection: 'row',
      justifyContent: 'center'
      },
      imageUpload: {
      margin: 5,
      width: 125,
      height: 125,
      borderColor: "black",
      borderWidth: 2
    },
    imageUploadView: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
})
