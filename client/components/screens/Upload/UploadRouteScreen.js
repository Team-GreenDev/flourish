import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import UploadScreen from './UploadScreen';
import CameraScreen from './CameraScreen';
import ARScreen from '../../ARComponent/ARScreen';
export default function UploadRouteScreen(){

  return (
    <NativeRouter>
      <View>
        <Switch>
          <Route exact path="/" component={UploadScreen} />
          <Route exact path="/camera" component={CameraScreen}/>
          {/* <Route exact path="/ar" render={(props) => <ARScreen {...props} history={history} />}/> */}
          <Route exact path="/ar" component={ARScreen}/>
        </Switch>
      </View>
    </NativeRouter>
  );
}