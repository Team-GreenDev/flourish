import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { PLANT_ID_KEY, CLOUDINARY_URL } from 'react-native-dotenv';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { setCurrentPhoto, setPlantIdData, setPhotoInForm } from '../../../store/slices/photo';

export default function CameraScreen({ history }) {
  // using dispatch & useSelector to get information form the store
  const dispatch = useDispatch();

  // set up hooks to handle permission for camera, type of camera, and camera ref
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // on page load, request permission from user
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

// if permission is null. return an empty view
if (hasPermission === null) {
    return <View />;
  }

// if permission if false, return no access to camera
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

// if permission if granted return a view displaying the camera
  return (
    <>
      <Camera style={styles.preview} type={type} ref={ref => {
        setCameraRef(ref) ;
      }}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => history.push("/")} style={{flex: 1}}>
            <MaterialCommunityIcons name="keyboard-backspace" color="white" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name="ios-reverse-camera" size={50} color="white" style={{flex: 1}}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              let photoFromCamera = await cameraRef.takePictureAsync({
                quality: .5,
                base64: true
              });

              // sets current photo to view on upload page
              dispatch(setCurrentPhoto({uri: photoFromCamera.uri}));

              // declare and assign base64 version of image picked from camera roll
              let base64Img = `data:image/jpg;base64,${photoFromCamera.base64}`;

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
              })
              .then(async result => {
                let data = await result.json()
                dispatch(setPhotoInForm(data.url));
              }).catch(err => console.log(err))

              history.push('/');
            }
          }}>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: 'white',
                height: 50,
                width:50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius:50,
                  borderColor: 'white',
                  height: 40,
                  width:40,
                  backgroundColor: 'white'
                }} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </>
  );
}

const styles = StyleSheet.create({
  preview: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    paddingHorizontal: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  }
});
