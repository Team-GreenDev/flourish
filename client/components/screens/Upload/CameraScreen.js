import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Button, Dimensions, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPhoto } from '../../../store/slices/photo';

export default function CameraScreen({ history }) {

  // using dispatch & useSelector to get information form the store
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photo);

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
        <View>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              let photo = await cameraRef.takePictureAsync({
                base64: true,
                quality: 1
              });
              dispatch(setCurrentPhoto(photo));
            }
          }}>
            <View style={{
               borderWidth: 2,
               borderRadius: 50,
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:50,
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      <View>
      <Button title="back" onPress={() => history.push('/')}></Button>
      </View>
      </>
  );
}
const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  preview: {
      height: winHeight,
      width: winWidth,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
  },
});