import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Asset } from 'expo-asset';
import { AR } from 'expo';
import * as Permissions from 'expo-permissions';
import { loadDaeAsync, Renderer, THREE, utils } from 'expo-three';
import { GraphicsView } from 'expo-graphics';
import { BackgroundTexture, Camera, Light } from 'expo-three-ar';

export default function ARScreen() {

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        return <Text>No access to camera</Text>;
      }
      // Turn off extra warnings
      THREE.suppressExpoWarnings(true);
    })();
  }, []);

  const onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    // This will allow ARKit to collect Horizontal surfaces
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);
    renderer = new Renderer({ gl, pixelRatio, width, height });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;

    scene = new THREE.Scene();
    scene.background = new BackgroundTexture(renderer);

    camera = new Camera(width, height, 0.01, 1000);

    // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    // Simple color material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
    });
  }

    // When the phone rotates, or the view changes size, this method will be called.
    const onResize = ({ x, y, scale, width, height }) => {
    // Let's stop the function if we haven't setup our scene yet
      if (!renderer) {
        return;
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(scale);
      renderer.setSize(width, height);
    };

  // Called every frame.
    const onRender = () => {
      // This will make the points get more rawDataPoints from Expo.AR
      // points.update(); idk what this is but commenting out lets camera open so whatever lol, may uncomment later
      // Finally render the scene with the AR Camera
      renderer.render(scene, camera);
    };

  return (
    (<GraphicsView
      style={{ flex: 1 }}
      onContextCreate={onContextCreate}
      onRender={onRender}
      onResize={onResize}
      isArEnabled
      isArRunningStateEnabled
      isArCameraStateEnabled
      arTrackingConfiguration={'ARWorldTrackingConfiguration'}
      />)
  );
}