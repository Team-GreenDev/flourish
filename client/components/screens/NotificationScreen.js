import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function NotificationScreen() {
  return (
    <ScrollView>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>MikeBazil liked your Post</Text>
          <Image style={styles.postImage} source={{uri: 'https://www.mochacasa.com/blog/wp-content/uploads/2015/02/plants-home.jpg'}}/>
        </View>
      </TouchableOpacity>
    </ScrollView>
  
  );
}


const styles = StyleSheet.create({
  notification: {
    flexDirection: 'row',
    borderWidth: 1, 
    borderColor: '#000000',
    backgroundColor: '#e8e6df'
  },
  postImage: {
    height: 75,
    width: 75,
    alignSelf: 'center',
    margin: 5,
  },
  notificationText: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 100,
  },
});