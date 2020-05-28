import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";

import { loadCommentsByPostId, addComment } from '../../../store/slices/comments';
import { getUserById } from '../../../store/slices/users';

// get dimensions for any phone screen to fit image
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;


export default function Comments({ history }) {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const currentUser = useSelector(state => state.auth.currentUser);
  const postsUser = useSelector(state => state.comments.currentUser);
  const post = useSelector(state => state.comments.currentPost);
  const postComments = useSelector(state => state.comments.list);
  const commentsAdded = useSelector(state => state.comments.commentsAdded);

  // local state for comment
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(loadCommentsByPostId(post.id));
  }, [commentsAdded]);

  // Add comment to database => { user_id , post_id, comment_text }
  const handleCommentSubmit = () => {
    const data = {
      comment_text: comment,
      user_id: currentUser.id,
      post_id: post.id,
    }
    dispatch(addComment(data));
    setComment('');
  }

  return (
    <View>

      <KeyboardAwareScrollView>

        <TouchableOpacity onPress={() => history.push("/")} style={{ flex: 1, paddingLeft: 10 }}>
          <MaterialCommunityIcons name="keyboard-backspace" color="black" size={35}/>
        </TouchableOpacity>

        <View style={styles.container}>
          <Image style={styles.postImg} source={{uri: post.url}}></Image>
        </View>

        <View style={{justifyContent: "center", alignItems: "center"}}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", marginVertical: 20}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <Image style={styles.profileImg }source={{uri: postsUser.image_url}}></Image>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>{postsUser.username}</Text>
              </View>
            </View>

            <View style={{flexDirection: "row"}}>
              <View style={{flexDirection: "row", alignItems: "center", marginHorizontal: 7}}>
                <MaterialCommunityIcons
                  name={"flower-tulip"}
                  size={28}
                  raised
                  style={{color: "#697A44", marginRight: 2}}
                />
                <Text style={{fontSize: 18}}>{post.like_count}</Text>
              </View>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <MaterialCommunityIcons
                  name={"comment-text-outline"}
                  size={28}
                  raised
                  style={{color: "#697A44", marginRight: 3}}
                />
                <Text style={{fontSize: 18}}>{postComments.length}</Text>
              </View>
          </View>
        </View>

        </View>

        <View style={{justifyContent: "center", alignItems: "center"}}>
          <View style={styles.postDescription}>
            <Text style={{fontSize:17}}>{post.text}</Text>
          </View>
          <View style={styles.tagView}>
            <Text style={{fontSize:17}}>{post.tag}</Text>
          </View>
          <View style={styles.commentContainer}>
            <Text style={{fontSize: 25, color: "#697A44", fontWeight: "500" }}>Comments ({postComments.length})</Text>
          </View>
        </View>

        <View>
          <TextInput
            multiline={true}
            placeholder="Add your comment..."
            style={styles.input}
            value={comment}
            onChangeText={text => setComment(text)}
          />

          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit} underlayColor="#9C4C33">
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>

        </View>

        <ScrollView>
          {postComments &&
            postComments.map((comment) => {
              const user = getUserById(state, comment.user_id)[0];
              const time = moment(comment.created_at).format("MMM DD, YYYY h:mmA");
              return (
                <View key={comment.pk} style={{marginVertical: 8}}>
                  <View style={{alignItems: "center"}}>
                    <View style={{
                      flexDirection: "row",
                      marginVertical: 5,
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      width: "87%",
                    }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#697A44",
                          fontWeight: "600",
                        }}
                      >{user.username}</Text>
                      <Text
                        style={{
                          color: "#697A44",
                        }}
                      >{time}</Text>
                    </View>
                  </View>
                    <View style={{
                      alignItems: "center",
                    }}>
                      <Text
                        style={{
                          width: "85%",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 16,
                        }}
                      >{comment.comment_text}</Text>
                    </View>
                </View>
              )
            })
          }
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  postDescription: {
    width: "85%",
  },
  submitContainer: {
    flexDirection: "row-reverse"
  },
  submitText:{
    fontSize: 18,
    color:'#fff',
    textAlign:'center',
    paddingHorizontal: 7,
    paddingVertical: 8
  },
  submitButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    backgroundColor:'#9C4C33',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 15,
    },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 30,
    marginLeft: 30,
    padding: 10,
    fontSize: 17,
  },
  commentContainer: {
    marginTop: 5,
    width: "85%",
  },
  tagView: {
    marginVertical: 12,
    width: "85%",
  },
  postImg: {
    height: verticalScale(350),
    width: moderateScale(350),
  },
  container: {
    alignItems: "center",
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 50/ 2,
    marginRight: 10,
  },
  imgAndUsername: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline"
  },
  username: {
    fontSize: 28,
    color: "#697A44",
    fontWeight: "500"
  }
});
