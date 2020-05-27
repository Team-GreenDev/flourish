import React from 'react';
import {View} from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';

import HomeScreen from './HomeScreen';
import HomeProfileScreen from './HomeProfileScreen';
import Comments from './comments'

export default function MessageRouteScreen(){
  return (
    <NativeRouter>
      <View>
        <Switch>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/profile" component={HomeProfileScreen}/>
          <Route exact path="/comments" component={Comments}/>
        </Switch>
      </View>
    </NativeRouter>
  );
}