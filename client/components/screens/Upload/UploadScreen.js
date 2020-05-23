import React from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Image, SafeAreaView, Platform, Text, ScrollView } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { PLANT_ID_KEY } from 'react-native-dotenv';

import PlantList from './PlantList';
import { addPost } from '../../../store/slices/posts';
import { setCurrentPhoto, setPlantIdData, setCloudinaryData } from '../../../store/slices/photo';
import { loadPlants } from '../../../store/slices/plants';

export default function UploadScreen({ history }) {
  // using dispatch & useSelector to get information from the redux store
  const dispatch = useDispatch();
  const currentPhoto = useSelector(state => state.photo.currentPhoto);
  const plants = useSelector(state => state.plants);
  const cloudinaryData = useSelector(state => state.photo.cloudinaryData);
  const plantIdData = useSelector(state => state.photo.plantIdData);

  // storing cloudinary url using our
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dsw29lceg/upload';

  const openImagePickerAsync = async () => {
    // function to ask permission to use camera roll
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return
    }

    // function to store the image that was chosen by user
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    // dispatch chosen image to store
    dispatch(setCurrentPhoto(pickerResult))
    if (pickerResult.cancelled === true) {
      return;
    }

    // declare and assign base64 version of image picked from camera roll
    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    // format body of request to send to cloudinary
    let data = {
      "file": base64Img,
      "upload_preset": "cdqppny0"
    }

    // add cloudinary data to store for fetch request
    dispatch(setCloudinaryData(data));

    // add plantId data to store for fetch request
    dispatch(setPlantIdData({
      api_key: PLANT_ID_KEY,
      images: [base64Img],
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: ["common_names",
                        "url",
                        "name_authority",
                        "wiki_description",
                        "taxonomy",
                        "synonyms"]
    }));
  }

  const sendToCloudinary = () => {
    // post request to cloudinary
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(cloudinaryData),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async result => {
      let data = await result.json()
      setPhoto(data.url);
    }).catch(err => console.log(err))
  };

  // Plant Id Lookup
  const plantIdLookUp = () => {
    if(currentPhoto) {
      dispatch(loadPlants(plantIdData));
    }
  }

  // // function to be used to post to cloudiary with base64 image from photo taken from camera
  //   // not in use
  // const cameraPhoto = async () => {
  //   let base64Img = `data:image/jpg;base64,${currentPhoto.base64}`;
  //   let data = {
  //     "file": base64Img,
  //     "upload_preset": "cdqppny0"
  //   }

  //   fetch(CLOUDINARY_URL, {
  //     body: JSON.stringify(data),
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     method: 'POST',
  //   }).then(async r => {
  //     let data = await r.json()
  //   }).catch(err => console.log(err))
  // }

   // function for formik input fields
   function AppTextInput({ icon, ...otherProps }) {
    return (
      <View style={styles.container}>
        <TextInput
          placeholderTextColor="#6e6969"
          style={styles.text}
          {...otherProps}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <Formik
        initialValues={{description: '', tag: '', image: ''}}
        onSubmit={values => {
          values.image = photo;
          dispatch(addPost({
            text: values.description,
            url: values.image,
            user_id: currentUser.id,
            tag: values.tag
          }));
        }}
      >
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <>
          <SafeAreaView style={styles.imageUploadView}>
            {currentPhoto.uri ? <Image style={styles.imageUpload} source={{uri: currentPhoto.uri}} />
              : <View style={styles.imageUpload}><Text style={styles.imageUploadCaption}t>Add Your image here!</Text></View>}
            <View style={styles.iconsView}>
              <TouchableOpacity>
                <Ionicons style={styles.icon} name="ios-camera" size={60} onPress={() => history.push("/camera")}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons style={styles.icon} name="ios-image" size={50} onPress={() => openImagePickerAsync()}/>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <AppTextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={handleChange("description")}
            placeholder="description"
            textContentType="none"
          />
          <AppTextInput
            autoCapitalize="none"
            autoCorrect={true}
            onChangeText={handleChange("tag")}
            placeholder="tags"
            textContentType="none"
          />

          <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          {currentPhoto.uri ?
            (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Feather name="share" size={24} color="white" style={{paddingRight: 7}}/>
                <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>Share Post</Text>
              </TouchableOpacity>


            {plants.loading ? <Image source={require('../../../../assets/images/spinny.gif')} style={{width: 70, height: 70}}/>
              : <TouchableOpacity onPress={plantIdLookUp} style={styles.submitButton}>
                  <AntDesign name="idcard" size={24} color="white" style={{paddingRight: 7}}/>
                  <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>Identify Plant</Text>
                </TouchableOpacity>
            }
            </View>)
            : null }
          </View>
        </>
      )}
      </Formik>
      <PlantList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f4f4",
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
    marginBottom: -5,
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
    justifyContent: 'center',
    alignItems: "center",
  },
  imageUpload: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 300,
    height: 300,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
  },
  imageUploadCaption: {
    fontSize: 20,
  },
  imageUploadView: {
    justifyContent: 'center',
    alignItems: "center",
  },
  submitButton: {
    marginVertical: 0,
    marginHorizontal: 5,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "forestgreen",
    flexDirection: "row",
  }
});