import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';


// get dimensions for any phone screen to fit image
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
{/* <View style={{justifyContent: "center", alignItems: "center"}}>
</View>
{/* <TouchableOpacity onPress={() => history.push("/")} style={{ flex: 1, paddingLeft: 10 }}>
<MaterialCommunityIcons name="keyboard-backspace" color="black" size={35}/>
</TouchableOpacity> */}

export default function Comments({ history }) {


  return (
    <View style={styles.container}>
        <ScrollView>
        <Image style={styles.postImg} source={{uri: 'https://www.kindpng.com/picc/m/191-1915065_sword-fern-fern-plant-png-transparent-png.png'}}></Image>
        </ScrollView>
        <View style={styles.userInfo}>
        <Image style={styles.profileImg }source={{uri: "https://www.vhv.rs/dpng/d/233-2335904_weekend-palm-tree-hair-hd-png-download.png"}}></Image>
        <Text>xoweekday</Text>
        <MaterialCommunityIcons
        name={"flower-tulip"}
        size={24}
        raised
        style={styles.icon}
        onPress={() => console.log('hey')}
        />

        </View>
        <View>

        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    postImg: {
        height: verticalScale(350),
        width: moderateScale(350),
    },
    container: {
        alignItems: "center",
    },
    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 400/ 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black"
    },
    userInfo: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});