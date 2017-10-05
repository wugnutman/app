import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, CameraRoll
} from 'react-native'
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
            isVideoMode: true
        }
    }

    // ==============================> Capture Image
    onPressCapture() {
        this.camera.capture()
            .then((data) => {
                console.log(data);
            })
            .catch(err => {
                console.error(err)
            });
    }

    // ==============================> To Stop Video recording
    onPressCaptureStop() {
        this.camera.stopCapture()
            .then((data) => {
                console.log(data)
            })
            .catch(err => {
                console.error(err)
            });
    }

    // ==============================> Move to Album screen
    onPressAlbumButton() {
        this.props.navigation.navigate('mainAlbum');
    }

    // ==============================> Toggle Camer/Video icon
    toggleCameraMode() {
        const { isVideoMode } = this.state;
        this.setState({
            isVideoMode: !isVideoMode
        })
    }

    // ==============================> Render function definition
    render() {
        /**
         * captureTarget :
         * in DCIM folder or where default camera store the images => Camera.constants.CaptureTarget.cameraRoll
         * in cache memory, image will not shown in gallery => Camera.constants.CaptureTarget.temp
         * in Disk, com.projectName folder => Camera.constants.CaptureTarget.disk
         */
        return (
            <Camera
                ref={(cam) => { this.camera = cam }}
                captureTarget={Camera.constants.CaptureTarget.temp}
                aspect={Camera.constants.Aspect.fill}
                style={styles.container}
            >
                <View style={styles.menuContainer}>

                    {/* Album View */}
                    <TouchableOpacity onPress={this.onPressAlbumButton.bind(this)}>
                        <Image
                            source={require('../../common/images/user.jpg')}
                            style={styles.albumButton}
                        />
                    </TouchableOpacity>

                    {/* Location */}
                    <TouchableOpacity style={{ marginTop: 2 }} onPress={() => alert("Loaction screen, Under developement.")}>
                        <Icon name="compass" style={styles.iconButton} />
                    </TouchableOpacity>

                    {/* Capture Image / Video */}
                    <TouchableOpacity onPress={this.onPressCapture.bind(this)}>
                        <View style={styles.captureButton} />
                    </TouchableOpacity>

                    {/* Settings */}
                    <TouchableOpacity onPress={() => alert("Settings screen, Under developement.")}>
                        <Icon name="cog" style={styles.iconButton} />
                    </TouchableOpacity>

                    {/* Toggle Camera / Video */}
                    <TouchableOpacity onPress={this.toggleCameraMode.bind(this)}>
                        {
                            this.state.isVideoMode ?
                                <Icon name="video-camera" style={styles.iconButton} /> :
                                <Icon name="camera" style={styles.iconButton} />
                        }
                    </TouchableOpacity>

                </View>
            </Camera>
        );
    }
}