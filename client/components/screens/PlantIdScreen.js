import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Text, Image, View, ImageBackground, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { PLANT_ID_KEY } from 'react-native-dotenv';

import { loadPlants } from '../../store/slices/plants';

const PlantIdScreen = () => {
  const dispatch = useDispatch();
  const plants = useSelector(state => state.plants);
  const [ plantIdData, setPlantIdData ] = useState(null)
  const [ uploadPhoto, setUploadPhoto ] = useState(null)

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

    // Display uploaded photo
    setUploadPhoto(pickerResult.uri);

    // The code below is the same code as example from Plant.ID
    setPlantIdData({
      api_key: PLANT_ID_KEY,
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
    if(uploadPhoto) {
      dispatch(loadPlants(plantIdData));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {uploadPhoto ?
      <ImageBackground style={{width: 200, height: 200}} imageStyle={{borderRadius: 10}} source={{uri: uploadPhoto}}>
      <TouchableOpacity style={{alignItems: "flex-end"}}>
        <MaterialIcons
          style={{marginRight: 5}}
          name="clear"
          color="white"
          size={18}
          onPress={() => setUploadPhoto(null)}/>
        </TouchableOpacity>
      </ImageBackground>
      :
      <View style={{width: 200, height: 200, justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity>
          <MaterialIcons
            style={{marginRight: 5}}
            name="add-a-photo"
            size={60}
            onPress={() => openImagePickerAsync()}
          />
        </TouchableOpacity>
      </View>}

      <View style={{flexDirection: "row"}}>
        {plants.loading ? <Image source={require('../../../assets/images/spinny.gif')} style={{width: 70, height: 70}}/> :
        <TouchableOpacity onPress={handlePress} style={styles.submitButton}>
          <AntDesign name="idcard" size={24} color="white" style={{paddingRight: 7}}/>
          <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>Identify Plant</Text>
        </TouchableOpacity>}
      </View>

      <ScrollView style={{width: "80%"}}>
      {plants.suggestions ? plants.suggestions.map((plant, index) => (
        <View style={{marginVertical: 20, alignItems: "center"}} key={plant.id}>
          <Text>Suggestion #{index + 1} - Probability {Math.round(plant.probability*100)}%</Text>
          <Text>Common name(s): {plant.plant_details.common_names ? plant.plant_details.common_names[0] : null}</Text>
          {plant.similar_images.length ? <Image style={{width: 200, height: 200, borderRadius: 10}} source={{uri: plant.similar_images[0].url}}/> : null}
          <Text>Scientific name: {plant.plant_name}</Text>
          <Text></Text>
          <Text>Description: {plant.plant_details.wiki_description ? plant.plant_details.wiki_description.value : "not available"}</Text>
        </View>
      )) : null }
      </ScrollView>
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
    marginVertical: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    flexDirection: "row",
  }
})
