import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function SearchScreen({history}) {
  const [ searchQuery, setSearchQuery ] = useState('');
  // const [ searchedBool, setSearchedBool ] = useState(false);

  const handleSearch = (e) => {
    console.log(searchQuery);
    setSearchQuery('');
    history.push("/results")
  };

  return (
    <ScrollView>
      <SearchBar
        placeholder="Search..."
        onChangeText={(e) => setSearchQuery(e)}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        lightTheme={true}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{backgroundColor: '#ccd1c5', borderRadius: 1, }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Search for tags and plants!</Text>
        <Image style={styles.image} source={{uri: 'https://lh3.googleusercontent.com/proxy/S6sI1k-0-QTyKelaSKldpykzH_Y_OUFhfg_3soiZKrWh_Yh0V_s67_k8DELstyOuDidxqkVAIUwYuy_GSCFV87VY'}}/> 
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 320,
    width: 225,
    top: 300,
  },
  text: {
    fontSize: 25,
    top: 150,
  }

});