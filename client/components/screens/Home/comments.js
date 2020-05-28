import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, Text, View, ScrollView, Image, Button, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPostComments } from '../../../store/slices/comments';


// get dimensions for any phone screen to fit image
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;


export default function Comments({ history }) {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.comments.currentUser);
    const currentPost = useSelector(state => state.comments.currentPost);
    const currentPostComments = useSelector(state => state.comments);

    useEffect(() => {
        dispatch(getPostComments(currentPost.id));
    }, []);


  return (
    <View>
        <KeyboardAwareScrollView >
         <TouchableOpacity onPress={() => history.push("/")} style={{ flex: 1, paddingLeft: 10 }}>
          <MaterialCommunityIcons name="keyboard-backspace" color="black" size={35}/>
        </TouchableOpacity>
        <View style={styles.container}>
        <Image style={styles.postImg} source={{uri: currentPost.url}}></Image>
        </View>
        <View style={styles.userInfo}>
        <View>
        <Image style={styles.profileImg }source={{uri: currentUser.image_url}}></Image>
        <View style={styles.usernameContainer}>
        <Text style={styles.username}>{currentUser.username}</Text>
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
        <Text>{currentPost.text}</Text>
        </View>
        <View style={styles.tagView}>
        <Text>{currentPost.tag}</Text>
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