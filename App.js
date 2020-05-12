import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './client/components/navigation/BottomTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>

      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
