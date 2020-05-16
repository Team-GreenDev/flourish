import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './client/store/configureStore';
import * as Google from 'expo-google-app-auth';
import { keyIOS, keyAND } from 'react-native-dotenv';

import BottomTabNavigator from './client/components/navigation/BottomTabNavigator';

const Stack = createStackNavigator();
const store = configureStore();

export default function App() {
  const [buttonDisabled, onButtonPress] = React.useState(false);
  const [view, setView] = React.useState(true);
  signIn = async() => {
    if(!buttonDisabled){
      onButtonPress(true)
      try {
        console.log(keyAND);
        const result = await Google.logInAsync({
          iosClientId: keyIOS,
          androidClientId: keyAND,
          scopes: ['profile', 'email'],
        });
    
        if (result.type === 'success') {
          console.log(result)
          setView(false);
        } else {
          console.log('cancelled');
        }
      } catch (e) {
        console.log('error', e);
      }
      setTimeout(() => {
        onButtonPress(false);
      }, 3000)
    }
  }

  const signMyLife = (
    <View style={styles.button}>
      <Button color='#726D9B' style={styles.button} title="Sign In with Google" onPress={() => signIn()} />
    </View>
  );

  const actualApp = (
    <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
  );

  return (
    <Provider store={store}>
      {view ? (signMyLife) : (actualApp)}
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
