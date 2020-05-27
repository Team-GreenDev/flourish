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
    <View>
        <ScrollView >
        <View style={styles.container}>
        <Image style={styles.postImg} source={{uri: 'https://www.kindpng.com/picc/m/191-1915065_sword-fern-fern-plant-png-transparent-png.png'}}></Image>
        </View>
        <View style={styles.userInfo}>
        <View style={styles.imgAndUsername}>
        <Image style={styles.profileImg }source={{uri: "https://www.vhv.rs/dpng/d/233-2335904_weekend-palm-tree-hair-hd-png-download.png"}}></Image>
        <View style={styles.usernameContainer}>
        <Text style={styles.username}>xoweekday</Text>
        </View>
        </View>
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
        </ScrollView>
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
        borderColor: "black",
        marginTop: 5,
        marginLeft: 10
    },
    userInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    imgAndUsername: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "baseline"
    },
    username: {
        margin: 10,
        marginBottom: 10,
        fontSize: 30
    }
});