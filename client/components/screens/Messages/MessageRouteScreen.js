import React from 'react';
import {View} from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';

import MessageScreen from './MessageScreen';
import PrivateMessageScreen from './PrivateMessageScreen';

export default function MessageRouteScreen(){
  return (
    <NativeRouter>
      <View>
        <Switch>
          <Route exact path="/" component={MessageScreen}/>
          <Route exact path="/privatemessages" component={PrivateMessageScreen}/>
        </Switch>
      </View>
    </NativeRouter>
  );
}
