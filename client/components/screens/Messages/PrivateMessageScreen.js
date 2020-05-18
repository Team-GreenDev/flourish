import React from 'react';
import {Text, Button, View, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, SafeAreaView} from 'react-native';
// var BubbleText = require('react-native-message-bubble');
import { moderateScale } from 'react-native-size-matters';
import Svg, {
  Path,
} from 'react-native-svg';

export default function PrivateMessageScreen({ history }){

  let messageDummy = [{
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Sup you into plants',
    created_at: '3:20 AM',
    id: 1,
  },
  {
    username: 'James Easter',
    profilePic: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WmtzXedJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/350985/7b8fc9d7-e830-4ca2-905c-5691bcb16f99.jpeg',
    lastMessage: 'Yeah man! Just got a new fern.',
    created_at: '3:27 AM',
    id: 2,
  },
  {
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'That\'s really cool! I\'m mostly into cactus myself',
    created_at: '8:27 AM',
    id: 3,
  },
  {
    username: 'James Easter',
    profilePic: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WmtzXedJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/350985/7b8fc9d7-e830-4ca2-905c-5691bcb16f99.jpeg',
    lastMessage: 'Cactuses are nice too',
    created_at: '8:47 AM',
    id: 4,
  },
  {
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Yeah I am very busy, and they are really easy to take care of',
    created_at: '11:21 AM',
    id: 5,
  },
  {
    username: 'James Easter',
    profilePic: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WmtzXedJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/350985/7b8fc9d7-e830-4ca2-905c-5691bcb16f99.jpeg',
    lastMessage: 'Yeah I have a couple lying around myself',
    created_at: '11:27 AM',
    id: 6,
  },
  {
    username: 'Chad',
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'You should check out my post I made on cactus',
    created_at: '12:20 PM',
    id: 7,
  },
  {
    username: 'James Easter',
    profilePic: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WmtzXedJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/350985/7b8fc9d7-e830-4ca2-905c-5691bcb16f99.jpeg',
    lastMessage: 'Will do man!',
    created_at: '2:27 PM',
    id: 8,
  },
]

  return (
    <View style={[styles.item, styles.itemIn]}>
    <View style={[styles.balloon, {backgroundColor: 'grey'}]}>
      <Text style={{paddingTop: 5, color: 'white'}}>Hey! How are you?</Text>
      <View
      style={[
        styles.arrowContainer,
        styles.arrowLeftContainer,
      ]}
    >

       <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
            <Path
                d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                fill="grey"
                x="0"
                y="0"
            />
        </Svg>
    </View>
    </View>
  </View>


  // <View style={[styles.item, styles.itemOut]}>
  //   <View style={[styles.balloon, {backgroundColor: '#1084ff'}]}>
  //     <Text style={{paddingTop: 5, color: 'white'}}>Hey! I am good. How are you?</Text>
  //     <View
  //     style={[
  //       styles.arrowContainer,
  //       styles.arrowRightContainer,
  //     ]}
  //   >
  //      <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
  //           <Path
  //               d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
  //               fill="#1084ff"
  //               x="0"
  //               y="0"
  //           />
  //       </Svg>
  //   </View>
  //   </View>
  // </View>





  //  <View style={[styles.item, styles.itemOut]}>
  //   <View style={[styles.balloon, {backgroundColor: '#1084ff'}]}>
  //     <Text style={{paddingTop: 5, color: 'white'}}>Check this Image out !!!</Text>
  //     <View
  //     style={[
  //       styles.arrowContainer,
  //       styles.arrowRightContainer,
  //     ]}
  //   >
  //      <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
  //           <Path
  //               d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
  //               fill="#1084ff"
  //               x="0"
  //               y="0"
  //           />
  //       </Svg>
  //   </View>
  //   </View>
  // </View>


  //  <View style={[styles.item, styles.itemOut]}>
  //   <View style={[styles.balloon, {backgroundColor: '#1084ff'}]}>

  //   <Image
  //       styleName="small"
  //       borderRadius={5}
  //       source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'}}
  //       />
  //     <View
  //     style={[
  //       styles.arrowContainer,
  //       styles.arrowRightContainer,
  //     ]}
  //   >
  //      <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
  //           <Path
  //               d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
  //               fill="#1084ff"
  //               x="0"
  //               y="0"
  //           />
  //       </Svg>
  //   </View>
  //   </View>
  // </View>


//  <View style={[styles.item, styles.itemIn]}>
//     <View style={[styles.balloon, {backgroundColor: 'grey'}]}>
//       <Text style={{paddingTop: 5, color: 'white'}}>Nice Picture</Text>
//       <View
//       style={[
//         styles.arrowContainer,
//         styles.arrowLeftContainer,
//       ]}
//     >

//        <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
//             <Path
//                 d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
//                 fill="grey"
//                 x="0"
//                 y="0"
//             />
//         </Svg>
//     </View>
//     </View>
//   </View>
  );
}

const styles = StyleSheet.create({
  // messagesContainer: {
  //   flexDirection: 'row',
  // },
  // messagesImage: {
  //   height: 50,
  //   width: 50,
  //   alignSelf: 'center',
  //   margin: 7,
  //   borderRadius: 100 / 2,
  // },
  // messagesText: {
  //   fontSize: 20,
  //   marginLeft: 10,
  //   marginBottom: 5,
  //   // maxWidth: 345,
  // },
  // messagesUsername: {
  //   fontSize: 15
  // },
  // vertText: {
  //   flexDirection: 'column'
  // },
  // input: {
  //   height: 40,
  //   fontSize: 20,
  //   backgroundColor: '#E9F1E9',
  // },
  // timeStamp: {
  //   color: '#94a57e',
  //   position: 'absolute',
  //   left: 340,
  // }
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row'
 },
 itemIn: {
     marginLeft: 20
 },
 itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20
 },
 balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
 },
 arrowContainer: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     zIndex: -1,
     flex: 1
 },
 arrowLeftContainer: {
     justifyContent: 'flex-end',
     alignItems: 'flex-start'
 },

 arrowRightContainer: {
     justifyContent: 'flex-end',
     alignItems: 'flex-end',
 },

 arrowLeft: {
     left: moderateScale(-6, 0.5),
 },

 arrowRight: {
     right:moderateScale(-6, 0.5),
 }
});