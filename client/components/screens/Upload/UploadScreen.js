import * as React from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { Link } from 'react-router-native';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../../../store/slices/posts';


export default function UploadScreen({ history }) {
  const [photo, setPhoto] = React.useState('');
  const dispatch = useDispatch();
  const currentPhoto = useSelector(state => state.photo.currentPhoto);


  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dsw29lceg/upload';
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
           {/* <AppTextInput
            maxLength={255}
            autoCapitalize="none"
            autoCorrect={true}
            multiline
            numberOfLines={3}
            onChangeText={handleChange("description")}
            placeholder="Upload Photo"
            textContentType="none"
          /> */}
          <AppTextInput
            autoCapitalize="none"
            autoCorrect={true}
            onChangeText={handleChange("tag")}
            placeholder="tags"
            textContentType="none"
          />
          <SafeAreaView style={styles.imageUploadView}>
       {photo === '' ? null : <Image style= {styles.imageUpload} source={{uri: photo}} />}
       </SafeAreaView>
          <View style={styles.iconsView}>
          <TouchableOpacity>
            <Link to='/camera'>
           <Ionicons style={styles.icon} name="ios-camera" size={50} onPress={() => history.push("/camera")}/>
            </Link>
         </TouchableOpacity> 
         <TouchableOpacity>
           <Ionicons style={styles.icon} name="ios-image" size={50} onPress={() => openImagePickerAsync()}/>
         </TouchableOpacity>
       </View>
          <Button onPress={handleSubmit} title="post" />
          <Button onPress={() => console.log(currentPhoto.uri)} title="test" />
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