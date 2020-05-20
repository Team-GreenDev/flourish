import React, { useEffect, useState } from 'react';
import {Text, Button, View, StyleSheet, ScrollView, TextInput,} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Svg, { Path } from 'react-native-svg';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, loadMessages } from '../../../store/slices/messages';

export default function PrivateMessageScreen({ history }){
  // a place holder for the input text field before sent to the store
  const [ messageText, setMessageText ] = useState('');

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser)
  const state = useSelector(state => state)
  const thread = useSelector(state => state.messages.list.filter((message) => (
    message.user_id === state.auth.currentUser.id && message.recipient_id === state.messages.recipientId ||
    message.user_id === state.messages.recipientId && message.recipient_id === state.auth.currentUser.id
  )))

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
  };

  return (
  <ScrollView>
    <Button
      title="Back"
      onPress={() => history.push("/")}
    />
    {thread.map(message => {
      if (message.recipient_id === currentUser.id) {
        return (
    <View key={message.id} style={[styles.item, styles.itemIn]}>
      <View style={[styles.balloon, {backgroundColor: 'grey'}]}>
        <Text style={{paddingTop: 5, color: 'white'}}>{message.text}</Text>
        <View
          style={[
            styles.arrowContainer,
            styles.arrowLeftContainer,
          ]}
        >
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
      } else {
        return (
    <View key={message.id} style={[styles.item, styles.itemOut]}>
      <View style={[styles.balloon, {backgroundColor: '#94a57e'}]}>
        <Text style={{paddingTop: 5, color: 'white'}}>{message.text}</Text>
        <View
          style={[
          styles.arrowContainer,
          styles.arrowRightContainer,
          ]}
        >
          <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
            <Path
              d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
              fill="#94a57e"
              x="0"
              y="0"
            />
          </Svg>
        </View>
      </View>
    </View>
        )
      }
    })}
  <TextInput
    style={styles.input}
    placeholder="Send a message..."
    value={messageText}
    onChangeText={(e) => setMessageText(e)}
    onSubmitEditing={handleSubmit}
  />
</ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 20,
    backgroundColor: '#94a57e',
  },
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