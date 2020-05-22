import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { useDispatch } from 'react-redux'
import { loadPlants } from '../../store/slices/plants'

const PlantIdScreen = () => {
  const dispatch = useDispatch();
  const [ plantIdData, setPlantIdData ] = useState(null)

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
    setPlantIdData({
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
    });

  };

  const handlePress = () =>{
    dispatch(loadPlants(plantIdData));
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Ionicons
          style={styles.icon}
          name="ios-image"
          size={60}
          onPress={() => openImagePickerAsync()}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress} style={styles.submitButton}>
        <View style={{flexDirection: "row"}}>
          <FontAwesome5 name="seedling" size={24} color="white" style={{padding: 3}}/>
          <AntDesign name="idcard" size={24} color="white" style={{padding: 3}}/>
        </View>
        <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>Identify Plant</Text>
      </TouchableOpacity>
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
  submitButton: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
  }
})
