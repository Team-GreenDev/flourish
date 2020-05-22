import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import UploadScreen from './UploadScreen';
import CameraScreen from './CameraScreen';
export default function UploadRouteScreen(){

  return (
    <NativeRouter>
      <View>
        <Switch>
          <Route exact path="/" component={UploadScreen} />
          <Route exact path="/camera" component={CameraScreen}/>
        </Switch>
      </View>
    </NativeRouter>
  );
}