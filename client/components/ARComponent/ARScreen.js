import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { AR } from 'expo';
import * as Permissions from 'expo-permissions';
import * as THREE from 'three';
import { Renderer } from 'expo-three';
import { GraphicsView } from 'expo-graphics';
import { BackgroundTexture, Camera } from 'expo-three-ar';
import ExpoTHREE from 'expo-three';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import GooglePoly from './GooglePoly';
import SearchableGooglePolyAssetList from './SearchableGooglePolyAssetList';
const poly = 'AIzaSyD4Sa0WT6oQlE52pMlcurzaNKrz2SEkj6c';
console.disableYellowBox= true;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.googlePoly = new GooglePoly(poly);
    this.state = {
      searchModalVisible: false,
      currentAsset: {},
    }
  }

  // On load, ask for camera permission if not already allowed access
  componentDidMount() {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        console.log('no camera');
        return <Text>No access to camera</Text>;
      }
      // Turn off extra warnings
      THREE.suppressExpoWarnings(true);
    })();
  }

  // Main Augmented Reality scene creation, handles background, model, and lighting
  onContextCreate = async ({gl, scale: pixelRatio, width, height, arSession }) => {
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);
    // Initialize renderer
    this.renderer = new Renderer({ gl, pixelRatio, width, height });
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;

    // Creating scene for Augmented Reality
    this.scene = new THREE.Scene();
    this.scene.background = new BackgroundTexture(this.renderer);

    // Creating camera for rendering later
    this.camera = new Camera(width, height, 0.01, 1000);

    // Initialize lighting...
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    this.scene.add(ambientLight);
  }

  // Will render scene along with camera
  onRender = (delta) => {
    // Rotate the object...
    // if (this.threeModel) {
    //   this.threeModel.rotation.x += 2 * delta;
    //   this.threeModel.rotation.y += 1.5 * delta;
    // }

    // Render...
    this.renderer.render(this.scene, this.camera);
  }

  // Add model to scene
  onAddObjectPress = () => {
    // Remove the current object...
    this.onRemoveObjectPress();

    // Add the current object...
    GooglePoly.getThreeModel(this.state.currentAsset, function(object) {
      this.threeModel = object;
      ExpoTHREE.utils.scaleLongestSideToSize(object, 1);
      object.position.z = -0.5;
      object.position.y = -1.2;
      this.scene.add(object);
    }.bind(this), function(error) {
      console.log(error);
    });
  }

  // Remove model from scene
  onRemoveObjectPress = () => {
    if (this.threeModel) {
      this.scene.remove(this.threeModel);
    }
  }

  // Cancel search modal
  onCancelPress = () => {
    this.setState({searchModalVisible: false});
  }

  // Change current model
  onAssetPress = (asset) => {
    this.setState({currentAsset: asset});
    this.setState({searchModalVisible: false});
  }

  // Brings up search modal
  onSearchModalPress = () => {
    this.setState({searchModalVisible: true});
  }

  // Exit Augmented Reality screen
  onExitPress = () => {
    this.props.history.push("/");
  }

  // When the phone rotates, or the view changes size, this method will be called.
  onResize = ({ x, y, scale, width, height }) => {
  // Let's stop the function if we haven't setup our scene yet
    if (!renderer) {
      return;
    }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(scale);
    renderer.setSize(width, height);
  };

  render() {
    return (
      <View style={styles.container}>
        <GraphicsView
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          isArEnabled
          // isArRunningStateEnabled
          isArCameraStateEnabled
          arTrackingConfiguration={'ARWorldTrackingConfiguration'}
          />

        <View style={{position:"absolute", bottom: 25, flex: 1, flexDirection: "row"}}>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
            {/* <View></View>
            <View></View>
            <View></View>
            <View></View>
            <View></View> */}
            <View></View>
            <Icon.Button size={40} name="plus" backgroundColor="transparent" onPress={this.onAddObjectPress} />
            <Icon.Button size={40} name="magnify" backgroundColor="transparent" onPress={this.onSearchModalPress} />
            <Icon.Button size={40} name="minus" backgroundColor="transparent" onPress={this.onRemoveObjectPress} />
            <Icon.Button size={40} name="close" backgroundColor="transparent" onPress={this.onExitPress} />
          </View>
        </View>

        <Modal visible={this.state.searchModalVisible} animationType="slide">
          <SearchableGooglePolyAssetList 
            googlePoly={this.googlePoly} 
            onCancelPress={this.onCancelPress}
            onAssetPress={this.onAssetPress}
          />
        </Modal>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    // width: '100%',
    // justifyContent: 'center',
    // alignContent: 'center',
  }
});