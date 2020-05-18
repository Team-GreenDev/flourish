import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function SearchScreen() {
  const [ searchQuery, setSearchQuery ] = useState('');

  const handleSearch = (e) => {
    console.log(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchBar
      placeholder="Search for a plant!"
      onChangeText={(e) => setSearchQuery(e)}
      value={searchQuery}
      onSubmitEditing={handleSearch}
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