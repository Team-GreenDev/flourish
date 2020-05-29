import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from "moment";
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { getUserById } from '../../../store/slices/users';
import { loadMessages, setRecipientId, deleteMessageThread } from '../../../store/slices/messages';

export default function ProfileScreen({ history }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser)
  const state = useSelector(state => state)
  const receivedMessages = useSelector(state => state.messages.list.filter((message) => message.recipient_id === state.auth.currentUser.id))
  const sentMessages = useSelector(state => state.messages.list.filter((message) => message.user_id === state.auth.currentUser.id))
  const users = useSelector(state => state.users)

  // all users ids to map over for messages
  const otherUsers = [...receivedMessages, ...sentMessages]
    .map((m) => m.user_id === currentUser.id ? m.recipient_id : m.user_id)
    .filter((e, i, c) => c.indexOf(e) === i);

  // changes to searched ids to map over for messages
  const [ messageUserIds, setMessageUserIds ] = useState(otherUsers.reverse());
  const [ loading, setLoading ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ showAll, setShowAll ] = useState(false);

  const mesThreads = otherUsers.map(user => {
    const singleThreadIncomingMessages = (sent, sender_id) => sent.filter((message) => message.user_id === sender_id);
    const singleThreadOutgoingMessages = (sent, sender_id) => sent.filter((message) => message.recipient_id === sender_id);
    return [...singleThreadIncomingMessages(receivedMessages, user), ...singleThreadOutgoingMessages(sentMessages, user)].sort((a, b) => a.id - b.id);
  });

  const handleClick = (userId) => {
    dispatch(setRecipientId(userId));
    history.push("/privatemessages")
  }

  useEffect(() => {
    dispatch(loadMessages());
  }, [state.messages.messageAdded])

  const handleSearch = () => {
    const searchedUsersIds = users.list.filter(user => (
      user.name_first.toLowerCase() === searchQuery.toLowerCase()
      || user.name_last.toLowerCase() === searchQuery.toLowerCase()))
      .map(user => user.id)

    setMessageUserIds(searchedUsersIds)
    setShowAll(true);
    setSearchQuery('');
  }

  const handleDelete = (data) => {
    setMessageUserIds(messageUserIds.filter(id => id !== data.recipient_id))
    dispatch(deleteMessageThread(data));
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 6 }}>
          <SearchBar
            placeholder="Search Messages..."
            onChangeText={(e) => setSearchQuery(e)}
            value={searchQuery}
            onSubmitEditing={handleSearch}
            lightTheme={true}
            inputStyle={{backgroundColor: '#F8F2D8', color: "#000"}}
            inputContainerStyle={{backgroundColor: "#F8F2D8", marginHorizontal: 10}}
            containerStyle={{backgroundColor: "white", borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
            searchIcon={{color: "#9C4C33", size: 30}}
            placeholderTextColor="#9C4C33"
            round={true}
            showLoading={loading}
          />
         </View>
        <View style={{ flex: 1, marginLeft: 10}}>
          <TouchableOpacity style={{backgroundColor: "white"}}onPress={() => history.push("/newmessage")}>
            <MaterialCommunityIcons name="square-edit-outline" color="green" size={40}/>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {state ? (messageUserIds.map((userId, index) => {
          const user = getUserById(state, userId)[0];
          const mostRecentMessage = mesThreads[index][mesThreads[index].length - 1];
          const time = moment(mostRecentMessage.created_at).format("MMM-DD");
          return (
            <Swipeable
              key={user.id}
              renderRightActions={() => {
              return (
                <TouchableWithoutFeedback onPress={() => handleDelete({user_id: currentUser.id, recipient_id: userId})}>
                  <View style={{
                    backgroundColor: "#ff5252",
                    width: 70,
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                  >
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={35}
                      color="white"
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}}
            >
              <TouchableWithoutFeedback
                onPress={() => handleClick(user.id)}
              >
                <View style={styles.messagesContainer}>
                  <Image style={styles.messagesImage} source={{uri: user.image_url}}/>
                  <View style={styles.vertText}>
                    <Text style={styles.messagesUsername}>{user.username}</Text>
                    <Text style={styles.messagesText}>
                      {mostRecentMessage.user_id === userId ? "" : "You : "}
                      {mostRecentMessage.text.length > 25
                        ? (`${mostRecentMessage.text.slice(0, 25)}...`)
                        : (mostRecentMessage.text)}
                    </Text>
                  </View>
                  <Text style={styles.timeStamp}>{time}</Text>
                </View>
              </TouchableWithoutFeedback>
            </Swipeable>
          )})) : <Text>Loading...</Text>}
        </ScrollView>
        {showAll &&
          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center", marginVertical: 20}}
            onPress={() => {
                setShowAll(false);
                setMessageUserIds(otherUsers);
              }}>
            <Text>show all messages</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  messagesContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: "#F2F2F2",
  },
  messagesImage: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    margin: 7,
    borderRadius: 100 / 2,
  },
  messagesText: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 3,
    color: 'gray'
  },
  messagesUsername: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    paddingLeft: 8,
    paddingTop: 5,
  },
  vertText: {
    flexDirection: 'column'
  },
  screenContainer: {
    height: "100%",
  },
  timeStamp: {
    color: '#94a57e',
    position: 'absolute',
    left: 310,
    top: 17,
  }
});