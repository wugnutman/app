import React, { Component } from 'react';
import io from 'socket.io-client';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ListView,
  Platform,
  Button,
  Dimensions
} from 'react-native';
import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';

import styles from './WebDemo.styles';

const { width, height } = Dimensions.get('window');

const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
let isFront;
let pc;
let that;
/**
 * @class Represent the WebDemo Component
 */
export default class WebDemo extends Component {
  constructor(props) {
    super(props);
    // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => true });
    // this.state = {
    //   info: 'Initializing',
    //   status: 'init',
    //   roomID: '',
    //   isFront: true,
    //   selfViewSrc: null,
    //   remoteList: {},
    //   textRoomConnected: false,
    //   textRoomData: [],
    //   textRoomValue: '',
    // };
    this.state = {
      videoUrl: null
    }
  }
  componentWillMount() {
    pc = new RTCPeerConnection(configuration);
    isFront = true;
    that = this;
  }
  componentDidMount() {
    MediaStreamTrack
      .getSources()
      .then(sourceInfos => {
        console.log(sourceInfos);
        let videoSourceId;
        for (const i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
            videoSourceId = sourceInfo.id;
          }
        }
        return getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: width, // Provide your own width, height and frame rate here
              minHeight: height,
              minFrameRate: 30
            },
            facingMode: (isFront ? "user" : "environment"),
            optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
          }
        });
      })
      .then(stream => {
        console.log('dddd', stream, stream.toURL());
        that.setState({ videoUrl: stream.toURL() })
      })
      .catch((logError) => { console.log(logError); });

    // pc.createOffer()
    //   .then(pc.setLocalDescription)
    //   .then((temp) => {
    //     // Send pc.localDescription to peer
    //     console.log(temp);
    //   })
    //   .catch((logError) => { console.log(logError); });

    // pc.onicecandidate = function (event) {
    //   // send event.candidate to peer
    //   console.log(event);
    // };
  }
  render() {
    const self = this;
    return (
      <View style={styles.container}>
        {this.state.videoUrl ? <RTCView streamURL={this.state.videoUrl} style={{width: width-20, height: height, resizeMode: 'contain'}} /> : null}
      </View>
    );
  }
}
