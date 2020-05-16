import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook';
import { IOS_CLIENT_ID, FACEBOOK_ID } from 'react-native-dotenv';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '.././store/slices/auth';



export default function LoginScreen ({itWorked}) {
  const dispatch = useDispatch();

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        dispatch(login(1));
        itWorked();
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  async function signInWithFacebookAsync() {
    try {
      await Facebook.initializeAsync(FACEBOOK_ID);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        console.log('cancelled');
      }
    } catch ({ err }) {
      alert(`Facebook Login Error: ${err}`);
    }
  }
    const signInWithGoogle = () => {
    signInWithGoogleAsync()
    }
    const signInWithFacebook = () => {
      signInWithFacebookAsync()
    }

    return (
      <View style={styles.container}>
        <Button onPress={() => signInWithGoogle()} title="Sign in with Google" />
        <Button onPress={() => signInWithFacebook()} title="Sign in with Facebook" />
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