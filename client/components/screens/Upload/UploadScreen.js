import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, SafeAreaView, Platform, Text, ScrollView, Alert } from 'react-native';
import { Ionicons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { PLANT_ID_KEY, CLOUDINARY_URL } from 'react-native-dotenv';

import PlantList from './PlantList';
import { addPost } from '../../../store/slices/posts';
import { setCurrentPhoto, setPlantIdData, setPhotoInForm } from '../../../store/slices/photo';
import { loadPlants } from '../../../store/slices/plants';

export default function UploadScreen({ history }) {
  // using dispatch & useSelector to get information from the redux store
  const dispatch = useDispatch();
  const photoInForm = useSelector(state => state.photo.photoInForm);
  const currentPhoto = useSelector(state => state.photo.currentPhoto);
  const plants = useSelector(state => state.plants);
  const plantIdData = useSelector(state => state.photo.plantIdData);
  const currentUser = useSelector(state => state.auth.currentUser);

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

    // format body of request to send to cloudinary
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
    }).then(async result => {
      let data = await result.json()
      dispatch(setPhotoInForm(data.url));
    }).catch(err => console.log(err))
  }

  // Plant Id Lookup
  const plantIdLookUp = () => {
    if(currentPhoto.uri) {
      dispatch(loadPlants(plantIdData));
    } else {
      Alert.alert('Add a photo of a plant!')
    }
  }

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

  const onSubmit = (values, {resetForm}) => {
    // Use current photo from store
    values.image = photoInForm;
    if(values.image.length > 0){
      if (values.description) {
        if (values.tag) {
          // Make a post
          dispatch(addPost({
            text: values.description,
            url: values.image,
            user_id: currentUser.id,
            tag: values.tag
          }));

          // Alert user of successful post
          Alert.alert('You shared your post!');

          // resets the form and state to empty
          resetForm({});
          dispatch(setCurrentPhoto({}))
          dispatch(setPhotoInForm(''))
        } else {
          Alert.alert('Add a tag to your post');
        }
      } else {
        Alert.alert('Add your description');
      }
    } else {
      Alert.alert('Add your photo');
    }
  }

  return (
    <ScrollView>
      <Formik
        initialValues={{description: '', tag: '', image: ''}}
        onSubmit={onSubmit}
      >
      {({handleChange, handleBlur, submitForm, values}) => (
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
            value={values.description || ''}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={handleChange("description")}
            placeholder="description"
            textContentType="none"
          />
          <AppTextInput
            value={values.tag || ''}
            autoCapitalize="none"
            autoCorrect={true}
            onChangeText={handleChange("tag")}
            placeholder="tags"
            textContentType="none"
          />

          <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity onPress={submitForm} style={styles.submitButton}>
                <Feather name="share" size={24} color="white" style={{paddingRight: 7}}/>
                <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>Post</Text>
              </TouchableOpacity>

            {plants.loading ? <Image source={require('../../../../assets/images/spinny.gif')} style={{width: 70, height: 70}}/>
              : <TouchableOpacity onPress={plantIdLookUp} style={styles.submitButton}>
                  <AntDesign name="idcard" size={24} color="white" style={{paddingRight: 7}}/>
                  <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>Identify Plant</Text>
                </TouchableOpacity>
            }
              <TouchableOpacity onPress={() => history.push('/ar')} style={styles.submitButton}>
                <MaterialCommunityIcons name="augmented-reality" size={24} color="white" style={{paddingRight: 7}}/>
                <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>View</Text>
              </TouchableOpacity>
            </View>
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