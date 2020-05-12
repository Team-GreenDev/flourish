import React, { useState, check, useEffect } from 'react';
import { NodeCameraView } from 'react-native-nodemediaclient';
import axios from 'axios';
import { PERMISSIONS, check, request } from 'react-native-permissions';

const LiveVideo = () => {
  createLive = async () => {
  const auth = {
    username: process.env.MUX_ACCESS_TOKEN,
    password: process.env.MUX_SECRET
  };
  const param = { "reduced_latency": true, "playback_policy": "public", "new_asset_settings": { "playback_policy": "public" } }
  const res = await axios.post('https://api.mux.com/video/v1/live-streams', param, { auth: auth }).catch((error) => {
    throw error;
  });
  console.log(res.data.data);
  const data = res.data.data;
  this.setState({
    streamId: data.stream_key
  });
  }

//   const [cameraGranted, setCameraGranted] = useState(false);
//   const handleCameraPermission = async () => {
//     const res = await check(PERMISSIONS.IOS.CAMERA);
//     if (res === RESULTS.GRANTED) {
//       setCameraGranted(true);
//     } else if (res === RESULTS.DENIED) {
//       const res2 = await request(PERMISSIONS.IOS.CAMERA);
//       res2 === RESULTS.GRANTED 
//         ? setCameraGranted(true) : setCameraGranted(false);
//     }
//  };

//  useEffect(() => {
//   handleCameraPermission();
//   }, []);


  return (
    <div>
      {/* // {cameraGranted */}
      {/* //   ? <Text>Camera Granted! Display in-app camera...</Text> 
      //   : <Text>Camera Disallowed</Text>
      // } */}
    <NodeCameraView
      style={styles.nodeCameraView}
      ref={(vb) => { this.vb = vb; }}
      outputUrl={`rtmp://global-live.mux.com:5222/app/${this.state.streamId}`}
      camera={{ cameraId: 1, cameraFrontMirror: true }}
      audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
      video={{
        preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false,
      }}
      autopreview
    />
    <Button title="request permissions" onPress={requestCameraPermission} />
  <Button
  onPress={() => {
    if (this.state.isPublish) {
      this.setState({ publishBtnTitle: 'Start Publish', isPublish: false });
      this.vb.stop();
    } else {
      this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true });
      this.vb.start();
    }
  }}
    title={this.state.publishBtnTitle}
    color="#841584"
  />
  </div>
  );
};

export default LiveVideo;