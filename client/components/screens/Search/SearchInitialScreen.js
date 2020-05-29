import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SearchScreen({history}) {
  const allPosts = useSelector(state => state.posts.list);
  const users = useSelector(state => state.users)

  const getUserById = (id) => users.list.filter((user) => user.id == id);

  const [ searchQuery, setSearchQuery ] = useState('');
  const [ select, setSelect ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ searchedPosts, setSearchedPosts ] = useState(null);

  const likedPostsIds = useSelector(state => state.posts.likedPosts.map(post => post.id));
  const allComments = useSelector(state => state.comments.allComments)

  const handleSearch = (e) => {
    if(select){
      const searchedUsersIds = users.list.filter(user => (
        user.name_first.toLowerCase() === searchQuery.toLowerCase()
        || user.name_last.toLowerCase() === searchQuery.toLowerCase()))
        .map(user => user.id)

      setSearchedPosts(allPosts.filter(post => searchedUsersIds.includes(post.user_id)));
    } else {
      const newPosts = allPosts.filter(post => post.tag.toLowerCase().search(searchQuery.toLowerCase()) !== -1)
      setSearchedPosts(newPosts);
    }
    setSearchQuery('');
  };

  const handleTagPress = () => {
    setSelect(false);
  }

  const handleUserPress = () => {
    setSelect(true);
  }

  return (
    <View style={{height: "100%", width: "100%"}}>
      <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
        <View style={{flexDirection: "row", width: "50%", justifyContent: "center", backgroundColor: "white"}}>
        <TouchableOpacity onPress={handleTagPress}>
          <Text
            style={{
              padding: 4,
              paddingHorizontal: 45,
              borderRadius: 3,
              borderWidth: 1,
              borderColor: "#697A44",
              color: select ? "#697A44" : "white",
              fontSize: 18,
              marginVertical: 15,
              backgroundColor: select ? "white" : "#697A44"
            }}>
              Tags
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUserPress}>
          <Text style={{
            padding: 4,
            paddingHorizontal: 45,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: "#697A44",
            color: select ? "white" : "#697A44",
            fontSize: 18,
            marginVertical: 15,
            backgroundColor: select ?  "#697A44" : "white"
          }}>
            Users
          </Text>
        </TouchableOpacity>
        </View>
      </View>
      <SearchBar
        placeholder="Search..."
        onChangeText={(e) => setSearchQuery(e)}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        lightTheme={true}
        inputStyle={{backgroundColor: '#F8F2D8', color: "#000"}}
        inputContainerStyle={{backgroundColor: "#F8F2D8", marginHorizontal: 20}}
        containerStyle={{backgroundColor: "white", borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
        searchIcon={{color: "#9C4C33", size: 30}}
        placeholderTextColor="#9C4C33"
        round={true}
        showLoading={loading}
      />
      <SafeAreaView
        style={{
          position: 'absolute',
          top: 130,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <ScrollView>
        {searchedPosts
          ? (searchedPosts.slice(0).reverse().map(post => {
            const name = getUserById(post.user_id)[0].username;
            return (
            <View key={post.id}>
              <Text> </Text>
              <View style={styles.post}>
                <Image style={styles.image} source={{ uri: post.url }}/>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <Text style={styles.username}>{name}</Text>
                    <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: "center", marginRight: 5}}>
                      <MaterialCommunityIcons
                        name={"flower-tulip"}
                        size={24}
                        raised
                        style={{color: likedPostsIds.includes(post.id) ? "#697A44" : "white"}}
                        onPress={() => console.log('like')}
                      />
                      <Text>{post.like_count}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: "center", marginRight: 8}}>
                      <MaterialCommunityIcons
                        name={"comment-text-outline"}
                        size={24}
                        raised
                        style={{color: "#697A44", marginRight: 1}}
                        onPress={() => console.log('comments')}
                      />
                      <Text>{allComments.filter(comment => comment.post_id === post.id).length}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.message}>{post.text}</Text>
                <Text style={styles.tags}>{post.tag}</Text>
              </View>
              <Text> </Text>
            </View>
            )}))
            : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    height: 350,
    width: 325,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  username: {
    marginHorizontal: 10,
    fontSize: 18,
    color: '#697A44',
    fontWeight: "600",
    fontFamily: "Thonburi"
  },
  message: {
    fontSize: 16,
    marginHorizontal:10,
    fontFamily: "Trebuchet MS",
  },
  tags: {
    color: '#69747C',
    fontWeight: "600",
    fontSize: 16,
    marginHorizontal:10,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: "Trebuchet MS"
  },
  body: {
    justifyContent: 'space-around',
  },
  post: {
    // Setting up image width.
    width: 325,
    height: 450,
    // Set border width.
    borderWidth: 1,

    // Set border Hex Color code here.
    borderColor: '#C0CDC6',

    // Set border Radius.
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#C0CDC6',
    justifyContent: "space-evenly",
    flex: 1,
  },
  likesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal:10,
  },
  icon: {
    color: "white",
  }
});