import React from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const PlantList = () => {
  const plants = useSelector(state => state.plants);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: "80%"}}>
      {plants.suggestions ? plants.suggestions.map((plant, index) => (
        <View style={{marginVertical: 20, alignItems: "center"}} key={plant.id}>
          <Text>Suggestion #{index + 1} - Probability {Math.round(plant.probability*100)}%</Text>
          <Text>Common name(s): {plant.plant_details.common_names ? plant.plant_details.common_names[0] : null}</Text>
          {plant.similar_images.length ? <Image style={{width: 200, height: 200, borderRadius: 10}} source={{uri: plant.similar_images[0].url}}/> : null}
          <Text>Scientific name: {plant.plant_name}</Text>
          <Text></Text>
          <Text>Description: {plant.plant_details.wiki_description ? plant.plant_details.wiki_description.value : "not available"}</Text>
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
