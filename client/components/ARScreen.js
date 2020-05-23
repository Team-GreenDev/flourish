import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Asset } from 'expo-asset';
import { AR } from 'expo';
import * as Permissions from 'expo-permissions';
import * as THREE from 'three';
import { loadDaeAsync, Renderer, utils } from 'expo-three';
import { GraphicsView } from 'expo-graphics';
import { BackgroundTexture, Camera, Light } from 'expo-three-ar';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
// import MODEL from '../../flower.json';

export default function ARScreen() {
  let renderer, scene, camera, mesh;
  // Ask for camera permission on load
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

  // Main function for creating Augmented Reality with 3D Models
  const onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    // This will allow ARKit to collect Horizontal surfaces
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);
    renderer = new Renderer({ gl, pixelRatio, width, height });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;

    // Creating scene for Augmented Reality
    scene = new THREE.Scene();
    scene.background = new BackgroundTexture(renderer);

    // Creating camera for rendering later
    camera = new Camera(width, height, 0.01, 1000);

    // Lighting for 3D model - should not affect loading
    scene.add(new THREE.AmbientLight( 0x404040 ));
    let light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light.position.set( 3, 3, 3 )
    scene.add(light);
    
    // ---------------Attempt with GLTFLoader (Error: isTrusted: false...)------------------------
    // const loader = new GLTFLoader();
    // // this utility function allows you to use any three.js
    // // loader with promises and async/await
    // const modelLoader = (url) => {
    //   return new Promise((resolve, reject) => {
    //     loader.load(url, data=> resolve(data), null, reject);
    //   });
    // }
    // async function main() {
    //   const gltf = await modelLoader('./uploads_files_1969587_Cactus1.gltf'),
    //   model = gltf.scene;
    //   scene.add(model);
    // }
    // main().catch(error => {
    //   console.error(error);
    // });
    // ---------------Attempt with Banana and OBJLoader (Works: Banana loads)------------------
    // var addBananaInScene = function(object){
    //   banana = object;
    //   //Move the banana in the scene
    //   banana.rotation.x = Math.PI/2;
    //   banana.position.y = -200;
    //   banana.position.z = 50;
    //   //Go through all children of the loaded object and search for a Mesh
    //   object.traverse( function ( child ) {
    //       //This allow us to check if the children is an instance of the Mesh constructor
    //       if(child instanceof THREE.Mesh){
    //           child.material.color = new THREE.Color(0X00FF00);
    //           //Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
    //           child.geometry.computeVertexNormals();
    //       }
    //   });
    //   //Add the 3D object in the scene
    //   scene.add(banana);
    //   onRender();
    // };
    // var loadOBJ = function(){
    //   //Manager from ThreeJs to track a loader and its status
    //   var manager = new THREE.LoadingManager();
    //   //Loader for Obj from Three.js
    //   var loader = new THREE.OBJLoader( manager );
    //   //Launch loading of the obj file, addBananaInScene is the callback when it's ready 
    //   loader.load( 'http://mamboleoo.be/learnThree/demos/banana.obj', addBananaInScene);
    // };
    // loadOBJ();
    // -----------------Attempt with MTLLoader and OBJLoader (Error: deprecated - setPath is old :( ))--------------------------
    // var mtlLoader = new THREE.MTLLoader();
    // mtlLoader.setPath( '/' );
    // var url = "indoor plant_02.mtl";
    // mtlLoader.load( url, function( materials ) {
    //   console.log('sakdfhadsf')
    //   materials.preload();

    //   var objLoader = new THREE.OBJLoader();
    //   objLoader.setMaterials( materials );
    //   objLoader.setPath( '/' );
    //   objLoader.load( 'indoor plant_02.obj', function ( object ) {

    //     object.position.y = - 95;
    //     scene.add( object );

    //   }, onProgress, onError );

    // });
    // -------------------Attempt with MTLLoader and OBJLoader (Error: isTrusted: false...)----------------------
    // const loadObjModel = (materialURL, objectURL) => {
    //   new MTLLoader().load(materialURL, materials => {
    //     materials.preload();
    //     //materials.Material.side = THREE.DoubleSide;
    //     console.log("Loaded Materials");
    //     var objLoader = new OBJLoader();
    //     objLoader.setMaterials(materials);
    //     objLoader.load(
    //       objectURL,
    //       object => {
    //         //const root = object.detail.loaderRootNode;
    //         console.log("Loaded Obj" + object);
    //         let mesh = object;
    //         object.position.z = -0.2;
    //         object.scale.set(0.07, 0.07, 0.07);
    //         scene.add(object);
    //         mesh.position.set(0, 0, 0);
    //         mesh.scale.set(0.07, 0.07, 0.07);
    //       },
    //       xhr => {
    //         console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //       },
    //       // called when loading has errors
    //       error => {
    //         console.log("An error happened" + error);
    //       }
    //     );
    //   });
    // };
    // loadObjModel('../../indoor plant_02.mtl', '../../indoor plant_02.obj');
    // -------------------Attempt with ObjectLoader (not to be confused with OBJLoader - also doesnt work)----------------------------
    // var loader = new THREE.ObjectLoader();
    // loader.load("01Alocasia_obj.obj",function ( obj ) {
    //   scene.add( obj );
    // });
    // -------------------Attempt with OBJLoader(importing directly - no THREE) (can load banana)-----------------------------
    var loader = new OBJLoader();
    loader.load(
      // resource URL
      'http://mamboleoo.be/learnThree/demos/banana.obj',
      // `assets/models/01Alocasia_obj.obj`,
      // onLoad callback
      // Here the loaded data is assumed to be an object
      function ( obj ) {
        // Add the loaded object to the scene
        console.log("loaded", obj)
        // obj.position.z = -0.2;
        scene.add( obj );
      },
      // onProgress callback
      function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },
      // onError callback
      function ( err ) {
        console.error( err );
      }
    );
    // --------------Attempt with ObjectLoader (also deprecated)------------------------------
    // const objLoader = new THREE.ObjectLoader();
    // objLoader.setPath('/');
    // objLoader.load('flower.json', (root) => {
    //   root.position.z = -0.7;
    //   scene.add(root);
    // });
    // ----------------Attempt with MTLLoader and OBJLoader(imported directly) (nada)-----------------------------
    // var mtlLoader = new MTLLoader();
    // console.log("AHHHHHHHHHHHHHHHHHHHHHHH");
    // mtlLoader.load('01Alocasia_obj.mtl', function(materials) {
    //   console.log("NADASFADSFAS");
    //   materials.preload();

    //   var objLoader = new OBJLoader();
    //   objLoader.load('01Alocasia_obj.obj', function(object) {
    //     object.position.z = -0.7;
    //     console.log("this work idk?AGAsfdsadfadskjfaksdjfhdsjhfkjsdhfhksjdh");
    //     scene.add(object);
    //   });
    // });
    // --------------(OLD OLD OLD)-----------------------------
    // var objLoader = new THREE.OBJLoader();
    // objLoader.setPath('/');

    // var mtlLoader = new THREE.MTLLoader();
    // mtlLoader.setPath('/');

    // new Promise((resolve) => {
    //   mtlLoader.load('01Alocasia_obj.mtl', (materials) => {
    //     resolve(materials);
    //   })
    // })
    // .then((materials) => {
    //   materials.preload();
    //   objLoader.setMaterials(materials);
    //   objLoader.load('01Alocasia_obj.obj', (object) => {
    //     scene.add(object);
    //   })
    // })
    // -------------------Cube works at least----------------------------
    // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    // Simple color material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
    });
    // Combine our geometry and material
    let cube = new THREE.Mesh(geometry, material);
    // Place the box 0.4 meters in front of us.
    cube.position.z = -0.4;
    // Add the cube to the scene
    scene.add(cube);

    // loadModel();
  }
  // ---------Attempt made outside of onContextCreate----------------------
  // const loadModel = () => {
  //   var loader = new THREE.ObjectLoader();
  //   loader.load(
  //     // resource URL
  //     "flower.json",
  //     // onLoad callback
  //     // Here the loaded data is assumed to be an object
  //     function ( obj ) {
  //       // Add the loaded object to the scene
  //       // obj.position.z = -0.2;
  //       scene.add( obj );
  //     },
  //     // onProgress callback
  //     function ( xhr ) {
  //       console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  //     },
  //     // onError callback
  //     function ( err ) {
  //       console.error( err );
  //     }
  //   );
  // };

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
    // points.update();
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