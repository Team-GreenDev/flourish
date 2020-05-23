import React from 'react';
import {View} from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';

import HomeScreen from './HomeScreen';
import HomeProfileScreen from './HomeProfileScreen';

export default function MessageRouteScreen(){
  return (
    <NativeRouter>
      <View>
        <Switch>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/profile" component={HomeProfileScreen}/>
        </Switch>
      </View>
    </NativeRouter>
  );
}