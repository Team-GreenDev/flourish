import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class ARScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{paddingTop:20}}>
        <Text>Test</Text>
      </View>
    );
  }
  
}


const styles = StyleSheet.create({

});