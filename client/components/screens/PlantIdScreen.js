import React from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const PlantIdScreen = () => {
  // Using ImagePicker to access phone image and send request
  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    let base64Img = [`data:image/jpg;base64,${pickerResult.base64}`];

    // The code below is the same code as example from Plant.ID
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

    fetch('https://api.plant.id/v2/identify', {
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
      console.error('Error:', error);
    });
  };

  return (
    // Rendering an icon to a mobile screen to upload and send request
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Ionicons
          style={styles.icon}
          name="ios-image"
          size={60}
          onPress={() => openImagePickerAsync()}/>
      </TouchableOpacity>
      <Text>Load Image to Plant.ID API</Text>
    </SafeAreaView>
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
    color: "dodgerblue"
  },
})
