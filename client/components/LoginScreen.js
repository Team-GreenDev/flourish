import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, StatusBar } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { IOS_CLIENT_ID, FACEBOOK_ID, AND_CLIENT_ID } from 'react-native-dotenv';
import { useDispatch, useSelector } from 'react-redux';
import { login, setCurrentUser } from '.././store/slices/auth';

export default function LoginScreen ({logInSuccessful}) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.list)

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: IOS_CLIENT_ID,
        androidClientId: AND_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const prevUser = users.find(user => user.id == result.user.id);

        let data = {
          name_first: result.user.givenName,
          name_last: result.user.familyName,
          username: result.user.name,
          id: result.user.id,
          image_url: result.user.photoUrl
        };

        if(prevUser) {
          // if previous user then current user is set to the previous users data
          dispatch(setCurrentUser(prevUser));
        } else {
          // if new user, new user is saved to the database
          dispatch(login(data));
        }

        // renders the rest of the app after user successfully logged in through google
        logInSuccessful();

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
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
        <View style={styles.backgroundContainer}>
          <Image style={styles.backgroundImage} source={require('../../assets/images/bbeb8ae14e6ecff8ba823e7e6e6ca6e8.jpg')} />
        </View>
        <View style={styles.logo}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
          </View>
        <View>
          <TouchableOpacity onPress={() => signInWithGoogle()}>
            <Text style={styles.button}>Sign in with Google</Text>
          </TouchableOpacity>
          </View>
        {/* <Button onPress={() => signInWithFacebook()} title="Sign in with Facebook" /> */}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
}, 
  backgroundImage: {
  flex: 1, 
  width: null, 
  height: null
},
  button: {
    backgroundColor: "#9C4C33",
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
})