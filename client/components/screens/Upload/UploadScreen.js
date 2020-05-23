import * as React from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { Link } from 'react-router-native';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../../../store/slices/posts';
import { setCurrentPhoto } from '../../../store/slices/photo';



export default function UploadScreen({ history }) {
  // using dispatch & useSelector to get information from the redux store
  const dispatch = useDispatch();
  const currentPhoto = useSelector(state => state.photo.currentPhoto);
  console.log(currentPhoto);


  // storing cloudinary url using our
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dsw29lceg/upload';

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

    // post request to cloudinary 
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async result => {
      let data = await result.json()
      setPhoto(data.url);
    }).catch(err => console.log(err))
  };

  // function to be used to post to cloudiary with base64 image from photo taken from camera
    // not in use
  const cameraPhoto = async () => {
    let base64Img = `data:image/jpg;base64,${currentPhoto.base64}`;
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
    }).catch(err => console.log(err))
  }
  return (
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
          <SafeAreaView style={styles.imageUploadView}>
       {currentPhoto.uri === '' ? <View></View> : <Image style={styles.imageUpload} source={{uri: currentPhoto.uri}} />}
       </SafeAreaView>
          <View style={styles.iconsView}>
          <TouchableOpacity>
           <Ionicons style={styles.icon} name="ios-camera" size={50} onPress={() => history.push("/camera")}/>
         </TouchableOpacity>
         <TouchableOpacity>
           <Ionicons style={styles.icon} name="ios-image" size={50} onPress={() => openImagePickerAsync()}/>
         </TouchableOpacity>
       </View>
          <Button onPress={handleSubmit} title="post" />
        </>
  )}
    </Formik>
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
  }
});