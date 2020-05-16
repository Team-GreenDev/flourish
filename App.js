import React, {useEffect, useState} from 'react';
import { Platform, StatusBar, StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './client/store/configureStore';

import BottomTabNavigator from './client/components/navigation/BottomTabNavigator';
import LoginScreen from './client/components/LoginScreen';

const Stack = createStackNavigator();
const store = configureStore();
import { login } from './client/store/slices/auth';


export default function App() {
  const [ loggedIn, setLoggedIn ] = useState(false)
  const itWorked = () => setLoggedIn(true);
  let state = store.getState()
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {loggedIn ?
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        : <LoginScreen itWorked={itWorked} />}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    width: 300,
    padding: 10,
    alignSelf: 'center',
  },
});
