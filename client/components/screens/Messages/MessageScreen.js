import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../../store/slices/users';
import { setPrivateMessage } from '../../../store/slices/privateMessage';

export default function ProfileScreen({ history }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser)
  const state = useSelector(state => state)
  const receivedMessages = useSelector(state => state.messages.list.filter((message) => message.recipient_id === state.auth.currentUser.id))
  const sentMessages = useSelector(state => state.messages.list.filter((message) => message.user_id === state.auth.currentUser.id))

  const otherUsers = [...receivedMessages, ...sentMessages]
    .map((m) => m.user_id === currentUser.id ? m.recipient_id : m.user_id)
    .filter((e, i, c) => c.indexOf(e) === i);

  const mesThreads = otherUsers.map(user => {
    const singleThreadIncomingMessages = (sent, sender_id) => sent.filter((message) => message.user_id === sender_id);
    const singleThreadOutgoingMessages = (sent, sender_id) => sent.filter((message) => message.recipient_id === sender_id);
    return [...singleThreadIncomingMessages(receivedMessages, user), ...singleThreadOutgoingMessages(sentMessages, user)].sort((a, b) => a.id - b.id);
  });

  const handleClick = (privateMessageThread) => {
    dispatch(setPrivateMessage(privateMessageThread));
    history.push("/privatemessages")
  }

  return (
    <ScrollView>
      <SearchBar
        placeholder="Search Messages..."
      />
      {state ? (otherUsers.map((userId, index) => {
        const user = getUserById(state, userId)[0];
        const mostRecentMessage = mesThreads[index][mesThreads[index].length - 1];
        return (
          <TouchableOpacity
            key={user.id}
            style={styles.messagesContainer}
            onPress={() => handleClick(mesThreads[index])}
          >
            <Image style={styles.messagesImage} source={{uri: user.image_url}}/>
            <View style={styles.vertText}>
              <Text style={styles.messagesUsername}>{user.username}</Text>
              <Text style={styles.messagesText}>
                {mostRecentMessage.user_id === userId ? "" : "You : "}
                {mostRecentMessage.text.length > 30
                  ? (`${mostRecentMessage.text.slice(0, 30)}...`)
                  : (mostRecentMessage.text)}
              </Text>
            </View>
            <Text style={styles.timeStamp}>{mostRecentMessage.created_at}</Text>
          </TouchableOpacity>
        )})) : <Text>Loading...</Text>}
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  messagesContainer: {
    flexDirection: 'row',
  },
  messagesImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    margin: 7,
    borderRadius: 100 / 2,
  },
  messagesText: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 10,
  },
  messagesUsername: {
    fontSize: 15,
    color: '#94a57e',
    fontWeight: 'bold',
  },
  vertText: {
    flexDirection: 'column'
  },
  timeStamp: {
    color: '#94a57e',
    position: 'absolute',
    left: 340,
  }
});