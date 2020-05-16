import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as Google from 'expo-google-app-auth'

const IOS_CLIENT_ID = '897634645344-qkd9kh2ao7hvdo1c72fnpbg9i6mp4ufi.apps.googleusercontent.com';
export default function LoginPage () {

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
    return (
      <View style={styles.container}>
        <Button onPress={signInWithGoogleAsync()} title="Sign in with Google" />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})