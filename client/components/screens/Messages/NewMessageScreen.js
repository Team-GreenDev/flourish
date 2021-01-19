import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../../../store/slices/messages';
import { setRecipientId } from '../../../store/slices/messages';
import SingleSelect from 'react-native-multiple-select';

const NewMessageScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [ selectedItem, setSelectedItem ] = useState([]);
  const [message, setMessage] = useState('');
  const state = useSelector(state => state)
  const users = useSelector(state => state.users.list.filter(user => user.id !== state.auth.currentUser.id))


  const handlePress = () => {
    history.push("/");
  };

  const handleSubmit = () => {
    if (selectedItem[0] && message){
      dispatch(addMessage({
        user_id: state.auth.currentUser.id,
        recipient_id: selectedItem[0],
        text: message,
      }));
      dispatch(setRecipientId(selectedItem[0]));
      history.push("/privatemessages");
    }
  };


  const onSelectedItemsChange = item => { setSelectedItem(item) };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePress} style={{ flex: 1, paddingLeft: 10 }}>
          <MaterialCommunityIcons name="keyboard-backspace" color="black" size={35}/>
        </TouchableOpacity>
        <View style={{flex: 1, paddingLeft: 3 }}>
          <Text style={{fontSize: 18}}>New Message</Text>
        </View>
      <View
        style={{flex: 1}}>
      </View>
      </View>
      <View>
      <SingleSelect
        hideSubmitButton
        single
        styleDropdownMenu={{height: 50,  width: "87%", marginLeft: 25}}
        styleDropdownMenuSubsection={{paddingLeft: 15, width: "90%"}}
        items={users}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItem}
        selectText="To:"
        searchInputPlaceholderText="Username"
        displayKey="username"
        searchInputStyle={{ color: '#CCC', fontSize: 18 }}
      />
      </View>
      <View style={{alignItems: "center" }}>
        <TextInput
          style={styles.messageInput}
          onChangeText={text => setMessage(text)}
          value={message}
          multiline
          placeholder="Message"
        />
      </View>
      <View style={{alignItems: "center"}}>
        <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
          <Text style={{margin: 10,fontSize: 18, color: "white", fontWeight: "bold"}}>Send</Text>
          <MaterialCommunityIcons name="send" color="white" size={20}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  messageInput: {
    height: 240,
    width: "90%",
    marginTop: 10,
    borderRadius: 15,
    paddingLeft: 20,
    paddingTop: 15,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
  sendButton: {
    width: "30%",
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 4,
    backgroundColor: "dodgerblue",
  },
})
export default NewMessageScreen
