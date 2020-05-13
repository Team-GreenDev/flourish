import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function SearchScreen() {
  const search = '';
  const updateSearch = console.log('this will change state of search');
  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={search}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: 25,
    color: 'darkslateblue'
  }
});