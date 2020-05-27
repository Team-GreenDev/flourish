import React from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { FrontSide } from 'three';

const PlantList = () => {
  const plants = useSelector(state => state.plants);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: "80%"}}>
      {plants.suggestions ? plants.suggestions.map((plant, index) => (
        <View style={{marginVertical: 20, alignItems: "center"}} key={plant.id}>
          <Text style={{fontSize: 16, fontFamily: "Thonburi", fontWeight: "bold"}}>{Math.round(plant.probability*100)}% Match</Text>
          <Text style={{fontSize: 14, fontFamily: "Thonburi"}}>Common name(s): {plant.plant_details.common_names ? plant.plant_details.common_names[0] : null}</Text>
          {plant.similar_images.length ? <Image style={{width: 320, height: 300, borderRadius: 10}} source={{uri: plant.similar_images[0].url}}/> : null}
          <Text style={{fontSize: 15, fontFamily: "Thonburi"}}>Scientific name: {plant.plant_name}</Text>
          <Text></Text>
          <Text style={{fontSize: 15, fontFamily: "Trebuchet MS"}}>Description: {plant.plant_details.wiki_description ? plant.plant_details.wiki_description.value : "not available"}</Text>
        </View>
      )) : null }
      </ScrollView>
    </SafeAreaView>
  )
}

export default PlantList

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})
