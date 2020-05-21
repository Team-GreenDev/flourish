import React from 'react';
import {View} from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';

import SearchInitialScreen from './SearchInitialScreen';
import SearchResultScreen from './SearchResultScreen';


export default function MessageRouteScreen(){
  return (
    <NativeRouter>
      <View>
        <Switch>
          <Route exact path="/" component={SearchInitialScreen}/>
          <Route exact path="/results" component={SearchResultScreen}/>
        </Switch>
      </View>
    </NativeRouter>
  );
}