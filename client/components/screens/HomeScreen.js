import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlants } from '../../store/plants';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const plantArray = useSelector(state => state.plants.list)

  useEffect(()=>{
    dispatch(loadPlants());
  }, [])

  return (
    <View styles={styles.container}>
      <Text style={styles.Text}>This is the Home Screen :)</Text>
      <Text style={styles.Text}>{plantArray[3].employee_salary}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  Text: {
    fontSize: 25,
    color: 'darkslateblue'
  }
});