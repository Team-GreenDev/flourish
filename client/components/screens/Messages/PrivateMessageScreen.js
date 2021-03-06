import React, { useEffect, useState, useRef } from 'react';
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Svg, { Path } from 'react-native-svg';
import { useSelector, useDispatch } from 'react-redux';

import { addMessage, loadMessages } from '../../../store/slices/messages';
import { getUserById } from '../../../store/slices/users';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function PrivateMessageScreen({ history }){
  const scrollViewRef = useRef();
  const textInputRef = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser)
  const otherUser = useSelector(state => getUserById(state, state.messages.recipientId)[0])
  const state = useSelector(state => state)
  const thread = useSelector(state => state.messages.list.filter((message) => (
    message.user_id === state.auth.currentUser.id && message.recipient_id === state.messages.recipientId ||
    message.user_id === state.messages.recipientId && message.recipient_id === state.auth.currentUser.id
  )))

  // a place holder for the input text field before sent to the store
  const [ messageText, setMessageText ] = useState('');

  useEffect(() => {
    dispatch(loadMessages());
  }, [state.messages.messageAdded])

  const handleSubmit = (e) => {
    dispatch(addMessage({
      user_id: currentUser.id,
      recipient_id: state.messages.recipientId.toString(),
      text: messageText
    }))
    setMessageText('');
    textInputRef.current.clear();
  };

  return (
    <View style={{height: "100%", width: "100%", justifyContent: "center", alignItems: "center"}}>
      <View style={{flexDirection: "row", height: "10%", justifyContent: "center", alignItems: "center", flex: 1}}>
        <TouchableOpacity onPress={() => history.push("/")} style={{ flex: 1, paddingLeft: 10 }}>
          <MaterialCommunityIcons name="keyboard-backspace" color="black" size={35}/>
        </TouchableOpacity>
        <View style={{flex: 3, alignItems: "center" }}>
          <Text style={{fontSize: 20}}>{otherUser.username}</Text>
        </View>
        <View style={{flex: 1}}>

        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight)=> {scrollViewRef.current.scrollToEnd({animated: false})}}
        style={{height: "80%", width: "100%"}}>
        {thread.map(message => {
          return (message.recipient_id === currentUser.id) ?
            (<View key={message.id} style={[styles.item, styles.itemIn]}>
              <View style={[styles.balloon, {backgroundColor: 'grey'}]}>
                <Text style={{paddingTop: 5, color: 'white', fontSize: 20}}>{message.text}</Text>
                <View style={[styles.arrowContainer, styles.arrowLeftContainer]}>
                  <Svg
                    style={styles.arrowLeft}
                    width={moderateScale(15.5, 0.6)}
                    height={moderateScale(17.5, 0.6)}
                    viewBox="32.484 17.5 15.515 17.5"
                    enable-background="new 32.485 17.5 15.515 17.5"
                  >
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
            )
            :
            (<View key={message.id} style={[styles.item, styles.itemOut]}>
              <View style={[styles.balloon, {backgroundColor: '#94a57e'}]}>
                <Text style={{paddingTop: 5, color: 'white', fontSize: 20}}>{message.text}</Text>
                <View style={[styles.arrowContainer, styles.arrowRightContainer]}>
                  <Svg
                    style={styles.arrowRight}
                    width={moderateScale(15.5, 0.6)}
                    height={moderateScale(17.5, 0.6)}
                    viewBox="32.485 17.5 15.515 17.5"
                    enable-background="new 32.485 17.5 15.515 17.5"
                  >
                    <Path
                      d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                      fill="#94a57e"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
              </View>
            </View>)
          })
        }
      </ScrollView>
      <TextInput
        style={{
          flex: 1,
          height: "10%",
          width: "100%",
          paddingHorizontal: 20,
          fontSize: 20,
          backgroundColor: 'white',
        }}
        ref={textInputRef}
        placeholder="Send a message..."
        value={messageText}
        onChangeText={(e) => setMessageText(e)}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
