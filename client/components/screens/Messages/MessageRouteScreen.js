import React from 'react';
import {View} from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';

import MessageScreen from './MessageScreen';
import PrivateMessageScreen from './PrivateMessageScreen';
import NewMessageScreen from './NewMessageScreen';

export default function MessageRouteScreen(){
  return (
    <NativeRouter>
      <View>
        <Switch>
          <Route exact path="/" component={MessageScreen}/>
          <Route exact path="/privatemessages" component={PrivateMessageScreen}/>
          <Route exact path="/newmessage" component={NewMessageScreen}/>
        </Switch>
      </View>
    </NativeRouter>
  );
}
