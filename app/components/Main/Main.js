import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, CameraRoll
} from 'react-native'

import Settings from './Settings'
import Album from './Album'
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './Main.styles';

/**
 * @class represents the Main component
 */
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVideoMode: true,
            isCompassMode: true
        }
    }

    onPressCapture() {
        const options = ["data", "path", "width", "height", "duration", "size"];
        this.camera.capture({ metadata: options })
            .then((data) => {
                console.log(data)
                // CameraRoll.saveImageWithTag(data.path)
                //     .then(function (result) {
                //         console.log('save succeeded ' + result);
                //     }).catch(function (error) {
                //         console.log('save failed ' + error);
                //     });
            })
            .catch(err => {
                console.error(err)
            });
    }
    onPressCaptureStop() {
        this.camera.stopCapture()
            .then((data) => {
                console.log(data)
            })
            .catch(err => {
                console.error(err)
            });
    }

    onPressAlbumButton() {
        this.props.navigation.navigate('album');
    }

    toggleCameraMode() {
        const { isVideoMode } = this.state
        this.setState({
            isVideoMode: !isVideoMode
        })
    }

    toggleCompassMode() {
        const { isCompassMode } = this.state
        this.setState({
            isCompassMode: !isCompassMode
        })
    }
    render() {
        return (
            <Camera
                ref={(cam) => { this.camera = cam }}
                captureMode={Camera.constants.CaptureMode.video}
                captureTarget={Camera.constants.CaptureTarget.disk}
                aspect={Camera.constants.Aspect.fill}
                style={styles.container}
            >

                {/* <TouchableOpacity onPress={this.onPressCapture.bind(this)}> */}
                <TouchableOpacity onPress={() => alert('Catured.')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.captureButton} />
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={this.onPressCaptureStop.bind(this)}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.captureButton} />
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => this.props.navigation.navigate('chat')}>
                    <Icon name="comments" style={styles.iconButton} />
                </TouchableOpacity>

                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={this.onPressAlbumButton.bind(this)}>
                        <Image
                            source={require('../../common/images/user.jpg')}
                            style={styles.albumButton}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.toggleCameraMode.bind(this)}>
                        {
                            this.state.isVideoMode ?
                                <Icon name="video-camera" style={styles.iconButton} /> :
                                <Icon name="camera" style={styles.iconButton} />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.toggleCompassMode.bind(this)}>
                        {
                            this.state.isCompassMode ?
                                <Icon name="compass" style={styles.iconButton} /> :
                                <Icon name="building" style={styles.iconButton} />
                        }
                    </TouchableOpacity>

                </View>
            </Camera>
        );
    }
}