import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, Text, View, ScrollView, Image, Button, TouchableOpacity, Dimensions, TextInput } from 'react-native';


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
        <KeyboardAwareScrollView >
        <View style={styles.container}>
        <Image style={styles.postImg} source={{uri: 'https://www.kindpng.com/picc/m/191-1915065_sword-fern-fern-plant-png-transparent-png.png'}}></Image>
        </View>
        <View style={styles.userInfo}>
        <View>
        <Image style={styles.profileImg }source={{uri: "https://www.vhv.rs/dpng/d/233-2335904_weekend-palm-tree-hair-hd-png-download.png"}}></Image>
        <View style={styles.usernameContainer}>
        <Text style={styles.username}>xoweekday</Text>
        </View>
        {/* <MaterialCommunityIcons
        name={"flower-tulip"}
        size={24}
        raised
        style={styles.icon}
        onPress={() => console.log('hey')}
        /> */}
        </View>
        </View>
        <View style={styles.postDescription}>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
        <View style={styles.tagView}>
        <Text>#fern #firstpost</Text>
        </View>
        <View style={styles.commentContainer}>
        <Text>Comments (12)</Text>
        </View>
        <View styles={styles.inputContainer}>
        <TextInput
        multiline={true}
        numberOfLines={10}
        placeholder="type"
        style={styles.input}
        />
        <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submitButton} underlayColor="#9C4C33">
        <Text style={styles.submitText}>Sumbit</Text>
        </TouchableOpacity>
        </View>
        </View>
        </KeyboardAwareScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
    postDescription: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20

    },
    submitContainer: {
        flexDirection: "row-reverse"
    },
    submitText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    submitButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#9C4C33',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginRight: 30,
        marginLeft: 30
    },
    inputContainer: {
        flex: 1,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"

    },
    commentContainer: {
        marginTop: 20,
        marginLeft: 20
    },
    tagView: {
        marginTop: 20,
        marginLeft: 20
    },
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
        fontSize: 25
    }
});